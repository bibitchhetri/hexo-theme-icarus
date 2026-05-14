const { Component } = require('inferno');
const ProjectArticle = require('./common/project-article');

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

        var adHtml = '<div class="card-content"><center><div class="bsa-standard" id="carbon-ad-01"></div>'
            + '<script>(function() { if (typeof _bsa !== "undefined" && _bsa) {'
            + '_bsa.init("custom", "CWYD65QY", "placement:leimaogithubio-standard", {'
            + 'target: "#carbon-ad-01",'
            + 'template: "<a href=\'##link##\' class=\'native-banner\' style=\'background: ##backgroundColor##\' rel=\'sponsored noopener\' target=\'_blank\' title=\'##company## \\u2014 ##tagline##\'> <img class=\'native-img\' width=\'125\' src=\'##logo##\' /> <div class=\'native-main\'> <div class=\'native-details\' style=\'color: ##textColor##; border-left: solid 1px ##textColor##;\'> <span class=\'native-company\'>Sponsored by ##company##</span> <span class=\'native-desc\'>##description##</span> </div> <span class=\'native-cta\' style=\'color: ##ctaTextColor##; background-color: ##ctaBackgroundColor##;\'>##callToAction##</span> </div> </a>"'
            + '}); } })();</script></center></div>';
        items.push(<div class="card" style={cardStyle} dangerouslySetInnerHTML={{ __html: adHtml }}></div>);

        if (!posts || !posts.length) {
            return <div>{items}</div>;
        }

        posts.forEach(function(post) {
            items.push(<div class="card" style={cardStyle}><ProjectArticle config={config} page={post} helper={helper} /></div>);
        });
        return <div>{items}</div>;
    }
};
