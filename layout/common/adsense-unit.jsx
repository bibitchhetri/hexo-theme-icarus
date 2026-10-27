const { Component } = require('inferno');

/**
 * Read the Google AdSense settings from the theme configuration.
 * The ad unit is configured once, as an `adsense` sidebar widget, and reused
 * for the in-feed cards.
 *
 * @param {object} config Theme configuration
 * @returns {{clientId: string, slotId: string}|null} AdSense settings or null
 */
function getAdSenseSettings(config) {
    if (!config || !Array.isArray(config.widgets)) {
        return null;
    }
    const widget = config.widgets.find(widget => widget.type === 'adsense');
    if (!widget || !widget.client_id || !widget.slot_id) {
        return null;
    }
    return { clientId: widget.client_id, slotId: widget.slot_id };
}

/**
 * Google AdSense responsive ad unit rendered inside a card.
 * Renders nothing when the ad unit is not configured.
 */
class AdSenseUnit extends Component {
    render() {
        const { clientId, slotId, format, style } = this.props;

        if (!clientId || !slotId) {
            return null;
        }

        return <div class="card" style={style} data-type="adsense">
            <div class="card-content">
                <ins class="adsbygoogle"
                    style="display:block"
                    data-ad-client={clientId}
                    data-ad-slot={slotId}
                    data-ad-format={format || 'auto'}
                    data-full-width-responsive="true"></ins>
                <script dangerouslySetInnerHTML={{
                    __html: '(adsbygoogle = window.adsbygoogle || []).push({});'
                }}></script>
            </div>
        </div>;
    }
}

AdSenseUnit.getSettings = getAdSenseSettings;

module.exports = AdSenseUnit;
