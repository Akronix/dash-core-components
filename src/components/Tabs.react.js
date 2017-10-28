import R from 'ramda';
import React, {PropTypes} from 'react';

const STYLES = {
    border: '1px lightgrey solid'
};

function Tab(props) {
    let defaultStyle = {
        'borderLeft': STYLES.border,
        'display': 'flex',
        'alignItems': 'center',
        'position': 'relative',
        'paddingTop': 10,
        'paddingBottom': 10,
        'cursor': props.isSelected ? 'default' : 'pointer',
        'boxSizing': 'border-box',
        'backgroundColor': props.isSelected ? 'white' : 'rgb(253, 253, 253)'
    };


    if (props.vertical) {
        defaultStyle = R.merge(defaultStyle, {
            'borderTop': STYLES.border,
            'borderBottom': props.isLast ? STYLES.border : null,
            'borderLeft': props.isSelected ? 'rgb(68, 126, 255) 2px solid': STYLES.border,
            'textAlign': 'left',
            'paddingLeft': '5px'
        });
    } else {
        defaultStyle = R.merge(defaultStyle, {
            'display': 'inline-flex',
            'borderRight': props.isLast ? STYLES.border : null,
            'borderTopLeftRadius': props.isFirst ? 2 : 0,
            'borderTopRightRadius': props.isLast ? 2 : 0,
            'borderTop': props.isSelected ? 'rgb(68, 126, 255) 2px solid' : STYLES.border,
            'width': `calc(100% / ${props.nTabs})`,
            'textAlign': 'center',
            'paddingLeft': 20,
            'paddingRight': 20
        });
    }

    const style = R.merge(defaultStyle, props.style)

    return (
        <div style={style} onClick={props.onClick} key={props.value}>
            {props.icon?
              <img src={props.icon} alt={props.label} width="30px" height="30px"
                style={{'marginRight': '7px'}}
              />
              : null}

            {props.label}

            {props.isSelected && !props.vertical ? <div style={{
                'position': 'absolute',
                'content': '',
                'bottom': '-1px',
                'height': '1px',
                'left': 0,
                'right': 0
            }}/> : null}

            {props.isSelected && props.vertical ? <div style={{
                'position': 'absolute',
                'content': '',
                'height': '100%',
                'width': '1px',
                'right': '-1px',
                'top': '0px'
            }}/> : null}

        </div>
    )
}

function Tabs(props) {
    return (
        <div>
            <div style={R.merge({
                'borderBottom': props.vertical ? null : STYLES.border,
                'borderRight': props.vertical ? STYLES.border : null,
                'boxSizing': 'border-box',
                'overflow': 'hidden'
            }, props.style)}>
                {props.tabs.map((t, i) => {
                    return Tab(R.merge(t, {
                        isLast: i === props.tabs.length  - 1,
                        isFirst: i === 0,
                        onClick: () => props.setProps({value: t.value}),
                        isSelected: t.value === props.value,
                        nTabs: props.tabs.length,
                        vertical: props.vertical,
                        style: R.merge(props.tabsStyle, t.style)
                    }));
                })}
            </div>
        </div>
    );
}


Tabs.propTypes = {
    id: PropTypes.string,

    /**
     * Style object to be merged in with the parent level tabs
     */
    style: PropTypes.object,


    /**
     * Style object for each tab element
     */
    tabsStyle: PropTypes.object,

    /**
     * An array of options
     */
    tabs: PropTypes.arrayOf(PropTypes.shape({
        /**
         * The checkbox's label
         */
        label: PropTypes.string,

        /**
         * The tab's icon src
         */
        icon: PropTypes.string,

        /**
         * The value of the tab. This value
         * corresponds to the items specified in the
         * `values` property.
         */
        value: PropTypes.number,

        /**
         * Style object for this specific tab
         */
        style: PropTypes.object
    })),

    /**
     * The currently selected tab
     */
    value: PropTypes.number,

    /**
     * Whether or not the tabs are rendered vertically
     */
    vertical: PropTypes.bool
}

Tabs.defaultProps = {
    vertical: false
}

export default Tabs;
