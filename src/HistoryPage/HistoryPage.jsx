import React from 'react';
import { connect } from 'react-redux';

import { historySearchActions } from '../_actions';

class HistoryPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(historySearchActions.getAll());
    }

    render() {
        const { historySearchs } = this.props;
        return (
            <div>
                {historySearchs.loading && <em>Loading History...</em>}
                {historySearchs.error && <span className="text-danger">ERROR: {historySearchs.error}</span>}
                {historySearchs.items && <p>Total searchs count - {historySearchs.items.length}</p>}
                {historySearchs.items ? historySearchs.items.map(function (hsr, i) {
                    return <div className="card border-primary" style={{ width: '100%', margin: '10px' }} key={i}>
                        <div className="card-body">
                            <div> History :
                      {hsr ? hsr.queryData.map(function (item, j) {
                                return <span key={j}>{item[0].split('.')[1]} {item[1]} {item[2]} , </span>
                            }) : ''}
                            </div>
                            <p>by : {hsr.user.name} </p>
                        </div>
                    </div>
                }) : ''}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { historySearchs } = state;
    return {
        historySearchs
    };
}

const connectedHistoryPage = connect(mapStateToProps)(HistoryPage);
export { connectedHistoryPage as HistoryPage };