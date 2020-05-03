import React from 'react';
import { connect } from 'react-redux';
import { StudentList } from './StudentList'
import { studentActions } from '../_actions';
import Autocomplete from 'react-autocomplete'
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr1: [],
            slectedsubject: '',
            input: [],
            slectedNum: 0,
            slectedFilter: '',
            showstudent: false
        };
    }
    selectedSubject(e) {
        this.setState({
            slectedsubject: e.target.value
        })
    }
    submitsubject(e) {

        if (this.state.slectedsubject !== '') {
            var arr = this.state.arr1;
            arr[0] = `result.${this.state.slectedsubject}`;
            this.setState({
                arr1: arr,
            })
        }
    }
    selectedFilter(e) {
        var arr = this.state.arr1;
        if (e.target.value) {
            arr[1] = (e.target.value)
            this.setState({
                arr1: arr,
                slectedFilter: e.target.value
            })
        }
    }
    myChangeHandler(e) {
        var arr = this.state.arr1;
        if (e.target.value) {
            arr[2] = Number.parseInt(e.target.value)
            this.setState({
                arr1: arr,
                slectedNum: e.target.value
            })
        }
    }
    submitFilter(e) {
        var arr = this.state.input;
        if (this.state.arr1) {
            var pushData = Array.from(this.state.arr1);
            arr.push(pushData);
            this.setState({
                input: arr,
                arr1: [],
                slectedsubject: null,
                slectedNum: 0,
                slectedFilter: ''
            })
        }
    }
    submitHandler(e) {
        this.setState({ showstudent: true })
        this.props.dispatch(studentActions.runQuery(this.state.input))

    }
    Clear(e) {
        if (this.state.input) {
            this.setState({
                input: [],
                showstudent: false
            })
        }
    }
    matchValue(state, value) {
        if (state && value) {
            return (
                state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
        }
    }
    componentDidMount() {
        this.props.dispatch(studentActions.getAllSubject());
    }

    render() {

        let selectsub = this.state.arr1[0] || "";
        let showerror = (this.state.slectedNum > 100 || this.state.slectedNum < 0)
        let disablebtn = (this.state.arr1.length < 3 || (this.state.slectedNum > 100 || this.state.slectedNum < 0))
        const { subjects } = this.props;
        return (
            <div>
                <div className="card border-primary mb-3">
                    <div className="card-header">select subject</div>
                    <div className="card-body">
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Subject</label>
                            <div className="col-sm-10">
                                {subjects.items && <Autocomplete
                                    value={this.state.slectedsubject || ''}
                                    inputProps={{ id: 'states-autocomplete' }}
                                    wrapperStyle={{ position: 'relative', width: '100%', display: 'inline-block' }}
                                    items={subjects.items}
                                    getItemValue={item => item.name}
                                    shouldItemRender={this.matchValue.bind(this)}
                                    onChange={this.selectedSubject.bind(this)}
                                    onSelect={value => this.setState({ slectedsubject: value })}
                                    renderMenu={children => (
                                        <div className="menu">
                                            {children}
                                        </div>
                                    )}
                                    renderItem={(item, isHighlighted) => (
                                        <div
                                            className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                                            key={item._id} >
                                            {item.name}
                                        </div>
                                    )}
                                />}
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-12">
                                <button className="btn btn-outline-primary" disabled={!this.state.slectedsubject} onClick={this.submitsubject.bind(this)}>Add Subject</button>
                            </div>
                        </div>
                    </div>
                </div>
                {(this.state.arr1.length > 0) && <div className="card border-primary mb-3">
                    <div className="card-header">Select Filter</div>
                    <div className="card-body">
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Subject</label>
                            <div className="col-sm-10">
                                <input type="text" readOnly className="form-control-plaintext" value={this.state.arr1.length > 0 ? selectsub.split('.')[1] : ''} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Filter</label>
                            <div className="col-sm-10">
                                <select className="custom-select" onChange={this.selectedFilter.bind(this)} value={this.state.slectedFilter || ''}>
                                    <option value=""></option>
                                    <option value="LESS_THAN">LESS_THAN</option>
                                    <option value="GREATER_THAN">GREATER_THAN</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Marks</label>
                            <div className="col-sm-10">
                                <input type="number" min="1"
                                    max="100" className="form-control" value={this.state.slectedNum || 0} onChange={this.myChangeHandler.bind(this)} />
                                {showerror &&
                                    <div className="help-block">number should be beetween 1 to 100</div>
                                }
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-12">
                                <button type="button" disabled={disablebtn} className="btn btn-outline-primary" onClick={this.submitFilter.bind(this)}>Add Filter</button>
                            </div>
                        </div>

                    </div>
                </div>}
                {this.state.input.length > 0 && <div className="card border-primary mb-3">
                    <div className="card-header">Selected query</div>
                    <div className="card-body">

                        <div className="form-group row">
                            <div className="col-sm-12">
                                <ul className="list-group">
                                    {this.state.input && this.state.input.map(function (item, i) {
                                        return <li className="list-group-item" key={i}>{item[0].split('.')[1]} {item[1]} {item[2]} </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-12">
                                <button type="button" className="btn btn-outline-primary" onClick={this.submitHandler.bind(this)}>Run query</button>

                            </div>
                        </div>

                    </div>
                </div>}
                {this.state.showstudent && <div >
                    <StudentList />
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <button type="button" className="btn btn-outline-primary" onClick={this.Clear.bind(this)}>Clear</button>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { subjects } = state;

    return {
        subjects,

    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };