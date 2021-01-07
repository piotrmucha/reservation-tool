import React from "react";
import UserProfile from "./../UserProfile";
import DateTimePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
import "react-datepicker/dist/react-datepicker.css";
import Alert from "@material-ui/lab/Alert";
registerLocale("pl", pl);
class ReservationForm extends React.Component {
  state = {
    selectedTime: new Date(),
    incorrectDate: false,
    remind: null,
    resourceName: this.props.resourceName,
    renderFunction: this.props.renderFunction,
    successSend: false,
  };
  makeReservation = async (time) => {
    const response = await fetch("http://localhost:8052/api/v1/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reservationUntil: time,
        resourceName: this.state.resourceName,
        assignTo: localStorage.getItem("email"),
        remindMinutesBefore: this.state.remind,
      }),
    }).catch((error) => {
      console.log("siema", error);
    });
    if (response) {
      console.log("test");
      var data = response.status;
      if (data === 201) {
        this.setState({
          successSend: true,
        });
        setTimeout(() => this.setState({ successSend: false }), 3000);
      }
    }
    this.state.renderFunction();
  };

  handleSend = (event) => {
    event.preventDefault();
    console.log(this.state.selectedTime, this.state.remind);
    var time = this.state.selectedTime;
    time = new Date(
      time.getTime() - time.getTimezoneOffset() * 60000
    ).toISOString();
    time = time.replace("T", " ");
    time = time.slice(0, -8);
    console.log("month", time);
    this.makeReservation(time);
  };

  setTime = () => {
    var date = new Date();
    date.setHours(date.getHours() + 1);
    return date;
  };

  validateTime = (e) => {
    this.setState({ incorrectDate: false });
    var current = new Date();
    console.log("hi", e, current);
    if (e <= current) {
      this.setState({ incorrectDate: true });
    } else {
      this.setState({ selectedTime: e });
    }
  };

  render() {
    console.log("loading");
    return (
      <div>
        <h1>Wypożycz zasób</h1>
        <form onSubmit={this.handleSend}>
          <label htmlFor="fname">Wybierz date do której wypożyczasz: </label>
          <DateTimePicker
            selected={this.state.selectedTime}
            minDate={new Date()}
            onChange={this.validateTime}
            placeholderText="Wybierz "
            locale="pl"
            showTimeSelect
            timeCaption="Godzina"
            timeFormat="p"
            timeIntervals={10}
            dateFormat="MM/dd/yyyy h:mm"
          />
          <label htmlFor="cars"> Czy wysłać powiadomienie mailowe? </label>
          <select
            id="remind"
            name="remindSelect"
            onChange={(e) => {
              this.setState({ remind: e.target.value });
            }}
          >
            <option value="null">Nie wysyłaj</option>
            <option value="5M">5 minut przed końcem</option>
            <option value="15M">15 minut przed końcem</option>
            <option value="1H">1 godzine przed końcem</option>
            <option value="24H">24 godziny przed końcem</option>
          </select>
          {this.state.incorrectDate && (
            <p class="error-register">
              Nie możesz wybrać godziny wcześniejszej niż obecna
            </p>
          )}
          {this.state.successSend && (
            <Alert severity="success">Poprawnie dokonano rezerwacji</Alert>
          )}
          <br></br>
          <input type="submit" value="Zarezweruj" />
        </form>
      </div>
    );
  }
}

export default ReservationForm;
