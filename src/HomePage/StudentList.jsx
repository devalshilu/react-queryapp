import React from 'react';
import { connect } from 'react-redux';
class StudentList extends React.Component {

    render() {
        const { students, subjects } = this.props;
        return (
            <div className="card border-primary mb-3">
                < div className="card-header" > Student List</div >
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                {subjects.items && subjects.items.map(function (sub, i) {
                                    return <th>{sub.name}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {students.items && students.items.map(function (item, i) {
                                return <tr key={i}>
                                    <td>{item.name}</td>
                                    {subjects.items && subjects.items.map(function (sub, i) {
                                        return <th>{item.result[i][sub.name]}</th>
                                    })}
                                    {/* <td>{item.result[0].Math}</td>
                                    <td>{item.result[1].English}</td>
                                    <td>{item.result[2].science}</td>
                                    <td>{item.result[3].hindi}</td>
                                    <td>{item.result[4].Computer}</td> */}
                                </tr>
                            })}
                        </tbody>
                    </table>

                </div>
            </div >
        );
    }
}

function mapStateToProps(state) {
    const { students, subjects } = state;

    return {
        students, subjects
    };
}

const connectedHomePage = connect(mapStateToProps)(StudentList);
export { connectedHomePage as StudentList };