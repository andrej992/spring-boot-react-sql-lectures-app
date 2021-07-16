import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class TodoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: '',
            category: this.props.match.params.category,
            startDate: moment(new Date()).format('YYYY-MM-DD'),
            targetDate: moment(new Date()).format('YYYY-MM-DD'),
            price: this.props.match.params.price,
            price: this.props.match.params.description
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        if (this.state.id === -1) {
            return
        }

        let username = AuthenticationService.getLoggedInUserName()

        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => this.setState({
                title: response.data.title,
                category: response.data.category,
                startDate: moment(response.data.startDate).format('YYYY-MM-DD'),
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD'),
                price: response.data.price,
                description: response.data.description
               }))
    }

    validate(values) {
        let errors = {}


        if (!values.title) {
            errors.title = 'Enter a Title'
        } else if (values.title.length < 5) {
            errors.title = 'Enter atleast 5 Characters in Title'
        }

        if(!values.category){
            errors.category = 'Enter the category'
        }

        if (!moment(values.startDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        if(!values.price){
           errors.price = 'Enter a price'
        }

        // if(values.description.length <10){
        //     errors.description = 'Enter atleast 10 characters into the description!'
        // }else if(!values.description){
        //     continue
        // }


        return errors

    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()

        let todo = {
            id: this.state.id,
            title: values.title,
            category: values.category,
            startDate: values.startDate,
            targetDate: values.targetDate,
            price: values.price,
            description: values.description
        }

        if (this.state.id === -1) {
            TodoDataService.createTodo(username, todo)
                .then(() => this.props.history.push('/todos'))
        } else {
            TodoDataService.updateTodo(username, this.state.id, todo)
                .then(() => this.props.history.push('/todos'))
        }

        console.log(values);
    }

    render() {

        let {title,category, startDate, targetDate,price, description} = this.state
        //let targetDate = this.state.targetDate

        return (
            <div>
                <h1>Lecture</h1>
                <div className="container">
                    <Formik
                        initialValues={{title,category,startDate,targetDate,price, description}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                   
                                    <ErrorMessage name="title" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="category" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="startDate" component="div"
                                        className="alert alert-warning" />                                       
                                    <ErrorMessage name="targetDate" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="price" component="div"
                                        className="alert alert-warning" />
                                    {/* <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" /> */}

                                    <fieldset className="form-group">
                                        <label>Title</label>
                                        <Field className="form-control" type="text" name="title" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Category</label>
                                        <Field className="form-control" type="text" name="category" />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Start Date</label>
                                        <Field className="form-control" type="date" name="startDate" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Price</label>
                                        <Field className="form-control" type="number" name="price" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>


                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default TodoComponent