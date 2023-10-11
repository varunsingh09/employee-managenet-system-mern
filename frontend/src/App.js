import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import jwt from "jsonwebtoken";

import Login from "./component/Login.jsx";
import Temp from "./component/Temp.jsx";
import NotFound404 from "./component/NotFound404.jsx";
import DashboardAdmin from "./component/admin/DashboardAdmin.jsx";
import DashboardHR from "./component/hr/DashboardHR.jsx";
import DashboardEmployee from "./component/employee/DashboardEmployee.jsx";
import { Switch } from "react-router";

import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  DefaultRoute
} from "react-router-dom";
import history from "./history.js";

class App extends Component {
  state = {
    data: {},
    loading: false,
    pass: true,
    isLogin: false,
    firstTimeAlert: true,
  };
  componentDidMount() {
    this.setState({
      data: {
        _id: localStorage.getItem("_id") || "",
        account: localStorage.getItem("account") || "",
        name: localStorage.getItem("name") || ""
      },
      isLogin: localStorage.getItem("isLogin") == "true"

    }, () => {
      // temporary : for user to see user id and pass of all accounts to explore all features of app
      this.alertFirstTime()
    });

  }
  alertFirstTime() {
    if (this.state.firstTimeAlert && !this.state.isLogin) {
      setTimeout(function () {
        console.log(
          `To explore the feature of this application here is the temporary id and pass for all account
      Admin:
          id:admin@gmail.com
          pass:admin
      Hr:
          id:hr@gmail.com
          pass:hr
      Employee:
          id:emp@gmail.com
          pass:emp
      `)
      }, 500);

      this.setState({ firstTimeAlert: false });
    }
  }
  render() {

    return (
      // <div>{this.state.isLogin ? (
      //   <div>

      //   <DashboardAdmin data={this.state.data}/>
      //   </div>
      // ) : (
      // <Login
      //   onSubmit={this.handleSubmit}
      //   loading={this.state.loading}
      //   pass={this.state.pass}
      // />
      // )}</div>
      //  <DashboardAdmin data={this.state.data}/>
      //  <DashboardHR  data={this.state.data}/>
      //  <DashboardEmployee   data={this.state.data}/>
      //  <Temp />
      // <NotFound404/>
      < Router >

        <Switch>
          <Route
            exact
            path="/login"
            render={props =>
              this.state.data["account"] == 1 ? (
                // <Dashboard />
                <Redirect to="/admin" />
              ) : // <Login OnLogin={this.handleLogin}/>

                this.state.data["account"] == 2 ? (
                  // <Dashboard />
                  <Redirect to="/hr" />
                ) : //
                  this.state.data["account"] == 3 ? (
                    // <Dashboard />
                    <Redirect to="/employee" />
                  ) : (
                    <Login
                      onSubmit={this.handleSubmit}
                      loading={this.state.loading}
                      pass={this.state.pass}
                    />
                  )
            }
          />
          <Route
            // exact
            path="/admin"
            render={props =>
              this.state.data["account"] == 1 ? (
                <DashboardAdmin
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            // exact
            path="/hr"
            render={props =>
              this.state.data["account"] == 2 ? (
                <DashboardHR
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            // exact
            path="/employee"
            render={props =>
              this.state.data["account"] == 3 ? (
                <DashboardEmployee
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          {/* <Route path="/" render={() => <Redirect to="/login" />} />
          <Route
            render={() => (
              //  <h1>Not Found app.JS</h1>
              <Redirect to="/login" />
            )}
          /> */}
          <Redirect to="/login" />
        </Switch>
      </Router >
    );
  }
  handleSubmit = event => {
    event.preventDefault();
    // console.log("id", event.target[0].value);
    this.setState({ pass: true });
    this.setState({ loading: true });
    this.login(event.target[0].value, event.target[1].value);
    event.target.reset();
  };
  handleLogout = event => {
    console.log("logout");
    localStorage.clear();
    this.componentDidMount();
  };
  login = (id, pass) => {
    // history.push('new/path/here/');

    // history.push('/page');
    // History.push('/page');
    // this.context.history.push('/path');

    //email=admin@gmail.com&password=admin

    let bodyLogin = {
      email: id,
      password: pass
    };
    // let bodyLogin ="email="+id+"&password="+pass;
    // {Email: id, Password: pass}

    axios
      .post("http://localhost:4000/api/login", bodyLogin)
      .then(res => {
        // console.log(decodedData.Account);
        console.log('res', res);
        //console.log(jwt.decode(res.data));
        var decodedData = res.data?.emp;
        localStorage.setItem("token", res.data?.token);

        if (
          (res == undefined ||
            res == null ||
            decodedData.account == undefined ||
            decodedData.account == null) &&
          !(
            decodedData.account == 1 ||
            decodedData.account == 2 ||
            decodedData.account == 3
          )
        ) {
          this.setState({ pass: false });
          this.setState({ loading: false });
        } else {
          if (decodedData.account == 1) {
            // this.setState({ data: decodedData });
            // localStorage.setItem('data', JSON.stringfy(decodedData));

            this.setState({ pass: true });
            // localStorage.setItem('pass', 'true');

            this.setState({ loading: false });
            // localStorage.setItem('loading', 'false');

            this.setState({ isLogin: true });
            localStorage.setItem("isLogin", true);

            // localStorage.setItem('isLogin', 'true');
            localStorage.setItem("account", 1);
            localStorage.setItem("_id", decodedData["_id"]);
            localStorage.setItem(
              "Name",
              decodedData["firstName"] + " " + decodedData["lastName"]
            );
            this.componentDidMount();
            history.push("#/admin/role");
          }
          if (decodedData.account == 2) {
            // this.setState({ data: decodedData });

            this.setState({ pass: true });
            this.setState({ loading: false });
            this.setState({ isLogin: true });
            localStorage.setItem("isLogin", true);

            localStorage.setItem("account", 2);
            localStorage.setItem("_id", decodedData["_id"]);
            localStorage.setItem(
              "name",
              decodedData["firstName"] + " " + decodedData["lastName"]
            );
            this.componentDidMount();

            history.push("#/hr/employee");
          }
          if (decodedData.account == 3) {
            // this.setState({ data: decodedData });

            this.setState({ pass: true });
            this.setState({ loading: false });
            this.setState({ isLogin: true });
            localStorage.setItem("isLogin", true);

            localStorage.setItem("account", 3);
            localStorage.setItem("_id", decodedData["_id"]);
            localStorage.setItem(
              "Name",
              decodedData["firstName"] + " " + decodedData["lastName"]
            );
            this.componentDidMount();

            history.push("#/employee/" + decodedData._id + "/personal-info");
          }
        }

        //  console.log(decodedData);
        //  console.log(`decodedData.toString()=="false" `,decodedData.toString()=="false" );

        //  if(decodedData.toString()=="false")

        //  { console.log("1");
        //  this.setState({ pass: false })
        //  this.setState({ loading: false }); ;

        // }else{
        //   console.log("2");
        //   this.setState({ pass: true });
        //  this.setState({ loading: false });
        //  this.setState({ data: decodedData});
        //  this.setState({ isLogin: true });

        // }
      })
      .catch(err => {
        console.log(err);
        this.setState({ pass: false });
        this.setState({ loading: false });
      });

  };
}

export default App;
