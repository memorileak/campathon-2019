import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import PropTypes from 'prop-types';

const getRoutesInPath = (routes, pathname) => {
    const routesInPathname = routes.filter((e) => {
        return pathname.includes(e.path);
    });
    return routesInPathname.sort((a, b) => {
        return a.path.length - b.path.length;
    })
};

class Breadcrumbs extends React.Component {
    constructor(props) {
        super(props);
        const { routes, history } = this.props;
        this.state = {
            routes: getRoutesInPath(routes, history.location.pathname)
        }
    }

    componentDidMount() {

        this.props.history.listen((e) => {
            const { routes } = this.props;
            const pathname = e.pathname;
            this.setState({ routes: getRoutesInPath(routes, pathname) });
        })
    }

    render() {
        const { routes } = this.state;
        const { history } = this.props;
        const pathname = history.location.pathname;
        return (
            routes.length > 0 ? (
                <Breadcrumb className="breadcrumbs">{
                    routes.map(({ title, path, exact }) => {
                        return (
                            <BreadcrumbItem key={path} active={!exact}>
                                {
                                    (!exact) ? title : ((path !== pathname)) ? <Link to={path}>{title}</Link> : title
                                }
                            </BreadcrumbItem>
                        )
                    }
                    )
                }</Breadcrumb>
            ) : null
        );
    };

};

Breadcrumbs.propTypes = {
    routes: PropTypes.array
}

export default withRouter(Breadcrumbs);

