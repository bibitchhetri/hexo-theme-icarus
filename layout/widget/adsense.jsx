const { Component } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');

/**
 * Google AdSense widget.
 * Renders nothing when `client_id` or `slot_id` is missing, so an
 * unconfigured ad unit never leaves an empty card on the page.
 *
 * @see https://www.google.com/adsense/new/
 */
class AdSense extends Component {
    render() {
        const { title, clientId, slotId } = this.props;

        if (!clientId || !slotId) {
            return null;
        }

        return <div class="card widget" data-type="adsense">
            <div class="card-content">
                <div class="menu">
                    <h3 class="menu-label">{title}</h3>
                    <ins class="adsbygoogle"
                        style="display:block"
                        data-ad-client={clientId}
                        data-ad-slot={slotId}
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                    <script dangerouslySetInnerHTML={{
                        __html: '(adsbygoogle = window.adsbygoogle || []).push({});'
                    }}></script>
                </div>
            </div>
        </div>;
    }
}

AdSense.Cacheable = cacheComponent(AdSense, 'widget.adsense', function (props) {
    const { widget, helper } = props;
    const { client_id, slot_id } = widget;
    return {
        title: helper.__('widget.adsense'),
        clientId: client_id,
        slotId: slot_id
    };
});

module.exports = AdSense;
