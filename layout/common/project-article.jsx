const { Component } = require('inferno');
const moment = require('moment');

function getWordCount(content) {
    if (typeof content === 'undefined') return 0;
    content = content.replace(/<\/?[a-z][^>]*>/gi, '');
    content = content.trim();
    return content ? (content.match(/[\u00ff-\uffff]|[a-zA-Z]+/g) || []).length : 0;
}

module.exports = class extends Component {
    render() {
        const { config, helper, page, basePath } = this.props;
        const { url_for, date_xml } = helper;
        const bp = basePath || '/projects/';

        const words = getWordCount(page._content);
        const readTime = moment.duration((words / 150.0) * 60, 'seconds').humanize();
        const href = url_for(bp + page.slug + '/');

        const tags = Array.isArray(page.tags) ? page.tags : [];
        const categories = Array.isArray(page.categories) ? page.categories : [];

        return <article class="card-content article" role="article">
            <h1 class="title is-size-3" style="font-family: 'PT Sans Narrow', sans-serif; font-weight: 700;">
                <a class="has-link-black-ter" href={href} style="color: #5299e0;">{page.title}</a>
            </h1>
            <div class="article-meta is-size-7 is-uppercase level is-mobile">
                <div class="level-left" style="margin-bottom: 0.50rem">
                    {page.date ? <span class="level-item">
                        <i class="far fa-calendar-alt">&nbsp;</i>
                        <time datetime={date_xml(page.date)} title={page.date.toISOString()}>{'POSTED ' + moment(page.date).fromNow().toUpperCase()}</time>
                    </span> : null}
                    {page.updated && !moment(page.date).isSame(moment(page.updated)) ? <span class="level-item is-hidden-mobile">
                        <i class="far fa-calendar-check">&nbsp;</i>
                        <time datetime={date_xml(page.updated)} title={page.updated.toISOString()}>{'UPDATED ' + moment(page.updated).fromNow().toUpperCase()}</time>
                    </span> : null}
                    {categories.length ? <span class="level-item">
                        <i class="far fa-folder-open has-text-grey"></i>&nbsp;
                        {categories.map(function(cat, i) {
                            const name = typeof cat === 'string' ? cat : (cat.name || '');
                            return <a class="link-muted" href={url_for('/categories/' + name + '/')}>{name}{i < categories.length - 1 ? ', ' : ''}</a>;
                        })}
                    </span> : null}
                    <span class="level-item">
                        <i class="far fa-clock"></i>&nbsp;{readTime + ' read (About ' + words + ' words)'}
                    </span>
                </div>
            </div>
            <div class="content" style="margin-top: 1.0rem" dangerouslySetInnerHTML={{ __html: page.excerpt || page.content }}></div>
            <hr style="height:1px;margin:1rem 0" />
            <div class="level is-mobile is-flex">
                <div class="article-tags is-size-7 is-uppercase">
                    <i class="fas fa-tags has-text-grey"></i>&nbsp;
                    {tags.map(function(tag, i) {
                        const name = typeof tag === 'string' ? tag : (tag.name || '');
                        return <div><a class="link-muted" rel="tag" href={url_for('/tags/' + name + '/')}>{name}{i < tags.length - 1 ? ',' : ''}</a>&nbsp;</div>;
                    })}
                </div>
                <a class="article-more button is-small is-size-7" href={href + '#more'}>
                    <i class="fas fa-book-reader has-text-grey"></i>&nbsp;&nbsp;Read More
                </a>
            </div>
        </article>;
    }
};
