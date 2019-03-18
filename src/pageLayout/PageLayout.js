import React from 'react';
import './PageLayout.scss';

class PageLayout extends React.Component {
    state = {}
    render() {
        return (
            <div className="main-content-wrapper">
                <div className="main-content">
                    {this.props.children}
                </div>
            </div>

        );
    }
}

export default PageLayout;