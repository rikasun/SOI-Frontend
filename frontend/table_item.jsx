import React from 'react';
import axios from "axios";
import { withRouter} from 'react-router-dom';
import accounting from "accounting-js";


class TableItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      date: ""
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.attachEvent = this.attachEvent.bind(this);
  }

  attachEvent() {
    let row = document.getElementsByClassName("lists");

    for (let i = 0; i < row.length; i++) {
      row[i].addEventListener("click", () => {
        row[i].classList.toggle("active");
        let content = row[i].nextElementSibling;
        if (content.style.display != "none") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }

  componentWillMount() {
    let url = `https://gist.githubusercontent.com/cranium/d8b83184bf0750f2c834760b7c9203dc/raw/a73a70716951f77b90e84b8848ff1fee46938dd1/soi.json`;
    axios.get(url).then(res => {
      let result = Object.values(res.data);
      this.setState({ lists: result });
    });
  }

  componentWillReceiveProps(nextProps) {
    // debugger
    if (this.props.location.search !== nextProps.location.search) {
      let url = `https://gist.githubusercontent.com/cranium/d8b83184bf0750f2c834760b7c9203dc/raw/a73a70716951f77b90e84b8848ff1fee46938dd1/soi.json`;
      const newDate = this.state.date;
      axios.get(url).then(res => {
        let newList = Object.values(res.data);
        for (let i = 0; i < newList.length; i++) {
          for (let j = 0; j < newList[i].issued_assets.length; j++) {
            if (
              newList[i].issued_assets[j] &&
              new Date(newList[i].issued_assets[j].investment_date) <
                new Date(newDate)
            ) {
              delete newList[i].issued_assets[j];
            }
          }
        }
        this.setState({ lists: newList });
      });
    }
  }

  handleSelect(e) {
    this.setState({ date: e.currentTarget.value });
  }

  handleSubmit() {
    this.props.history.push(`/?date=${this.state.date}`);
  }

  render() {
    return (
      <div>
        {this.state.lists.map(list => {
          return (
            <div key={list.id}>
              <div className="lists" onClick={this.attachEvent}>
                <div>{list.name}</div>
                <div>{accounting.formatMoney(list.quantity)}</div>
                <div>{`$ ${list.cost.$.toFixed(2).replace(
                  /\d(?=(\d{3})+\.)/g,
                  "$&,"
                )}`}</div>
              </div>

              <div className="content">
                {list.issued_assets.map(asset => {
                  return (
                    <div className="sublists" key={asset.id}>
                      <div />
                      <div>{asset.asset_class}</div>
                      <div>{asset.investment_date}</div>
                      <div>{accounting.formatMoney(asset.quantity)}</div>
                      <div>{`$ ${asset.cost.$.toFixed(2).replace(
                        /\d(?=(\d{3})+\.)/g,
                        "$&,"
                      )}`}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="total">
          <div>Total</div>
          <div>$ 3,006,000.00</div>
        </div>
        <br />
        <form>
          <div>
            <label id="start">Start date:</label>
            <input
              onChange={this.handleSelect}
              type="date"
              id="start"
              value={this.state.date}
            />
          </div>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(TableItem);

