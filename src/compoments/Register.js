import React from 'react'
// import axios from 'axios'
// import {Form, Button, FormGroup, Row, Label, Col, Input } from 'reactstrap'
// import {Button, FormControl, FormGroup, InputLabel, Input, FormHelperText} from '@material-ui/core'


class RegisterForm extends React.Component {
    constructor() {
        super()
        this.state = {
        firstname: "",
        lastname: "",
        gender: "",
        dob: "",
        age: "",
        addressline1: "",
        addressline2: "",
        phonenumber: "",
        pincode: "",
        state: "",
        district: ""
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        const formData = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            gender: this.state.gender,
            dob: this.state.dob,
            age: this.state.age,
            address1: this.state.address1,
            address2: this.state.address2,
            phonenumber: this.state.phonenumber,
            pincode: this.state.pincode,
            state: this.state.state,
            district: this.state.district
        }
        console.log(formData)
    }

    handleRadioChange  = (gender) => {
       this.setState({gender})
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })

    }

    handleChange_age = (e) => {
        console.log("DOB:", e.target.value);
    
        this.setState({ dob: e.target.value }, () => {

            console.log(this.state.dob);
            // this will have the latest this.state.dob
        })
       // call calculate_age with event.target.value
        let age_latest = {age_latest: this.calculateAge(e.target.value)}
        // console.log(age_latest);
        this.setState({ age: age_latest }, () => {
            console.log("Age:", this.state.age);
            // show latest this.state.age1
        })
      }

    calculateAge = (dob) => {
        let today = new Date()
        let birthDate = new Date(dob) //create a date object directly from`dob` argument.
        let age_now = today.getFullYear() - birthDate.getFullYear()

        let m = today.getMonth() - birthDate.getMonth()
        if( m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now-- ;
        }
        console.log(age_now);
        return age_now
    }

  getDetails = () => {
      fetch(`https://api.postalpincode.in/pincode/${this.state.pincode}`)
      .then(response => response.json())
      .then(data => {
          if(this.state.pincode === "") {
              alert("pincode required")
          }else {
               this.setState([{district: data[0].PostOffice[0].District, state:  data[0].PostOffice[0].State }])
        }
    }
    // console.log([{district: data[0].PostOffice[0].District, state:  data[0].PostOffice[0].State}])
   );
        
    }
    
    
    render(){
        return (

     <div class="container">
           <h2 id="title" class="text-center">Registration Form</h2>
       <form autoComplete="off" id="survey-form" onSubmit = {this.handleSubmit} >
        <div class="form-group">
            <label id="name-label" for="name">First Name*</label>
            <input type="text" class="form-control" id="firstname" placeholder=" Enter Your firstName"  name = "firstname" value ={this.state.firstname} 
            onChange = {this.handleChange}
            autoComplete="new-password"
            required />
        </div>
       <div class="form-group">
            <label id="name-label" for="name">Last Name*</label>
            <input type="text" class="form-control" id="lastname" placeholder=" Enter Your Last Name" name="lastname" value = {this.state.lastname} 
            onChange = {this.handleChange}
            autoComplete="new-password"
            required />
        </div>
        <div class="form-group">
        <label id="gender-label" for="gender" required> Gender </label>
        <label>
            <input type="radio" class="input-radio" id = "male" name= "gender" 
            checked = {this.state.gender === 'male'}
            onChange = {() => {
                this.handleRadioChange('male')}}
           />
                Male</label>
                <label> 
            <input type="radio" class="input-radio" name="gender" id="female"
            checked = {this.state.gender === 'female'}
            onChange = {() => {
                this.handleRadioChange('female')}}
            /> Female</label>
            <label> 
                <input type="radio" class="input-radio" name="gender" 
                checked = {this.state.gender === "transgender"}
                onChange = {() => {
                    this.handleRadioChange("transgender")}}
                id="transgender"/>
                Transgender
            </label>
        </div>

        <div class="form-group">
            <label id="birth-label" for="birth" required>D.O.B </label>
            <input type="date" name="dob" id ="dob" value={this.state.dob}  onChange={this.handleChange_age}
            
        class="form-control"/>
        </div>
        <div class="form-group">
            <label id="age-label" for="age" required>Age</label>
            <input type="number" id="age" name="age" value={this.state.age}
            onChange={this.handleChange} class="form-control"
            autoComplete="new-password"
            />
        </div>

        <div class="form-group">
            <label id="number-label" for="phonenumber">Phone Number </label>
            <input type="text" class="form-control" id="phonenumber" placeholder=" mobile number" name = "phonenumber" maxLength= "10"
            value={this.state.phonenumber}
            onChange = {this.handleChange}
            autoComplete="new-password"

            required/>
        </div>
        <div class="form-group">
            <label id="address1-label" for="address1">Address Line1*</label>
            <input type="text" class="form-control" id="address1" placeholder=" Enter Your address" name="address1" value ={this.state.address1}
            onChange={this.handleChange}
            autoComplete="new-password"
            required />
        </div>
        <div class="form-group">
            <label id="address2-label" for="address2">Address Line2(optional)</label>
            <input type="text" class="form-control" id="address2" placeholder=" Enter Your address" name="address2" value={this.state.address2}
            onChange={this.handleChange}
            autoComplete="new-password"
            required />
        </div>

        <div class="form-group">
            <label id="pincode-label" for="pincode">Pincode* </label>
            <input type="number" class="form-control" id="pincode" name="pincode" placeholder="pincode" value={this.state.pincode}
            onChange={this.handleChange}
            autoComplete="new-password"
            required
            /> <input type="button" class="btn" value ="Get Details" onClick={this.getDetails}/>
        </div>
        <div class="form-group">
            <label id="state-label" for="state">State</label>
            <input type="text" class="form-control" id="state"  name="state" 
            value = {this.state.state}
            onChange={this.handleChange}
            autoComplete="new-password"
            
            // disabled
            required />
        </div>

        <div class="form-group">
            <label id="District-label" for="district">District</label>
            <input type="text" class="form-control" id="district" name="district"
            value={this.state.district}
            onChange={this.handleChange}
            autoComplete="new-password"

            // disabled
            required />
        </div>
        <div class="form-group">
                        <label htmlFor='uploadPhoto'>Upload Photo</label>
                        <input type='file' name='uploadPhoto' id='uploadphoto' accept="image/*" />
                    </div>

        <div class="form-group">
            <button type="submit" id="submit" class="submit-button">save</button>
        </div>
      </form>
     </div>
        )
    }
}

export default RegisterForm
            