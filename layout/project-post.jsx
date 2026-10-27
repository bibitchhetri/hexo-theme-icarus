const { Component, Fragment } = require('inferno');
const Article = require('./common/article');
const AdSenseUnit = require('./common/adsense-unit');

module.exports = class extends Component {
    render() {
        const { config, page, helper } = this.props;

        const cardStyle = {
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, box-shadow 0.3s ease-in-out',
            opacity: 1,
            transformOrigin: 'center top'
        };

        const adSettings = AdSenseUnit.getSettings(config);

        return <Fragment>
            {adSettings ? <AdSenseUnit clientId={adSettings.clientId} slotId={adSettings.slotId} style={cardStyle} /> : null}
            <Article config={config} page={page} helper={helper} index={false} />
        </Fragment>;
    }
};
