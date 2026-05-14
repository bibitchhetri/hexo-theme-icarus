const { Component, Fragment } = require('inferno');
const Article = require('./common/article');

module.exports = class extends Component {
    render() {
        const { config, page, helper } = this.props;

        const cardStyle = {
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, box-shadow 0.3s ease-in-out',
            opacity: 1,
            transformOrigin: 'center top'
        };

        return <Fragment>
            <div class="card" style={cardStyle}>
                <div class="card-content" style="padding: 1rem 1.5rem;">
                    <h1 style="font-family: 'PT Sans Narrow', sans-serif; font-weight: 700; margin: 0; font-size: 1.2rem;">Curriculum Vitae</h1>
                </div>
            </div>
            <Article config={config} page={page} helper={helper} index={false} />
        </Fragment>;
    }
};
