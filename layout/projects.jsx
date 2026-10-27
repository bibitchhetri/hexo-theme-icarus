const { Component } = require('inferno');
const ProjectArticle = require('./common/project-article');
const AdSenseUnit = require('./common/adsense-unit');

module.exports = class extends Component {
    render() {
        const { config, page, helper } = this.props;

        var posts = page.posts;
        const cardStyle = {
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, box-shadow 0.3s ease-in-out',
            opacity: 1,
            transformOrigin: 'center top'
        };

        var items = [];

        const adSettings = AdSenseUnit.getSettings(config);
        if (adSettings) {
            items.push(<AdSenseUnit clientId={adSettings.clientId} slotId={adSettings.slotId} style={cardStyle} />);
        }

        if (!posts || !posts.length) {
            return <div>{items}</div>;
        }

        posts.forEach(function(post) {
            items.push(<div class="card" style={cardStyle}><ProjectArticle config={config} page={post} helper={helper} /></div>);
        });
        return <div>{items}</div>;
    }
};
