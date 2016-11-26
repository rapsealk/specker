import React, { Component } from 'react';
import { EditorState,getDefaultKeyBinding, KeyBindingUtil,
    Modifier, RichUtils,  DefaultDraftBlockRenderMap,SelectionState,
    EditorBlock, AtomicBlockUtils, Entity,convertToRaw, convertFromRaw,ContentState,
} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import { saveFeed } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Card from 'react-material-card';
import Editor from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'; // eslint-disable-line import/no-unresolved
import { fromJS, Map } from 'immutable';
import editorStyles from 'draft-js-mention-plugin/lib/plugin.css';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';


import axios from 'axios';
import CrawledCard from './home-editor-crawled-card';
import 'draft-js-emoji-plugin/lib/plugin.css';

const PersonMentions = fromJS([
    {
        name: 'matthew',
        title: 'Senior Software Engineer',
        avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
    },
    {
        name: 'julian',
        title: 'United Kingdom',
        avatar: 'https://pbs.twimg.com/profile_images/477132877763579904/m5bFc8LF_400x400.png',
    },
    {
        name: 'jyoti',
        title: 'New Delhi, India',
        avatar: 'https://pbs.twimg.com/profile_images/705714058939359233/IaJoIa78_400x400.jpg',
    },

]);
const TagMentions = fromJS([
    // {
    //   name: 'matthew',
    //   title: 'Senior Software Engineer',
    //   avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
    // },
    // {
    //   name: 'julian',
    //   title: 'United Kingdom',
    //   avatar: 'https://pbs.twimg.com/profile_images/477132877763579904/m5bFc8LF_400x400.png',
    // },
    // {
    //   name: 'jyoti',
    //   title: 'New Delhi, India',
    //   avatar: 'https://pbs.twimg.com/profile_images/705714058939359233/IaJoIa78_400x400.jpg',
    // },
    // {
    //   name: 'max',
    //   title: 'Travels around the world, brews coffee, skis mountains and makes stuff on the web.',
    //   avatar: 'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg',
    // },
    {
        name: 'nik',
        title: 'Passionate about Software Architecture, UX, Skiing & Triathlons',
        avatar: 'https://pbs.twimg.com/profile_images/535634005769457664/Ppl32NaN_400x400.jpeg',
    },
    {
        name: 'pascal',
        title: 'HeathIT hacker and researcher',
        avatar: 'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
    },
]);
const PersonMentionPlugin = createMentionPlugin({
    PersonMentions,
    entityMutability: 'IMMUTABLE',
    mentionPrefix: '@',
    mentionTrigger:'@',
});
const TagMentionPlugin = createMentionPlugin({
    TagMentions,
    entityMutability: 'IMMUTABLE',
    mentionPrefix: '#',
    mentionTrigger:'#',
});

const PersonEntry = (props) => {
    const {
        mention,
        theme,
        searchValue, // eslint-disable-line no-unused-vars
        ...parentProps
    } = props;

    return (
        <div {...parentProps}>
            <div className="mentionSuggestionsEntryContainer">
                <div className="mentionSuggestionsEntryContainerLeft">
                    <img
                        className="mentionSuggestionsEntryAvatar"
                        src={mention.get('avatar')}
                        role="presentation"
                    />
                </div>

                <div className="mentionSuggestionsEntryContainerRight">
                    <div className="mentionSuggestionsEntryText">
                        {mention.get('name')}
                    </div>

                    <div className="mentionSuggestionsEntryTitle">
                        {mention.get('title')}
                    </div>
                </div>
            </div>
        </div>
    );
};
const TagEntry = (props) => {
    const {
        mention,
        theme,
        searchValue, // eslint-disable-line no-unused-vars
        ...parentProps
    } = props;

    return (
        <div {...parentProps}>
            <div className="mentionSuggestionsEntryContainer">
                <div className="mentionSuggestionsEntryContainerLeft">
                    <img
                        className="mentionSuggestionsEntryAvatar"
                        src={mention.get('avatar')}
                        role="presentation"
                    />
                </div>

                <div className="mentionSuggestionsEntryContainerRight">
                    <div className="mentionSuggestionsEntryText">
                        {mention.get('name')}
                    </div>

                    <div className="mentionSuggestionsEntryTitle">
                        {mention.get('title')}
                    </div>
                </div>
            </div>
        </div>
    );
};

const { MentionSuggestions } = PersonMentionPlugin;
const TagMentionSuggestions = TagMentionPlugin.MentionSuggestions;

const linkifyPlugin = createLinkifyPlugin({
    component: (props) => (
        // eslint-disable-next-line no-alert, jsx-a11y/anchor-has-content
        <a {...props} onClick={() => window.open(props.href,'_blank')} />
    )
});
const emojiPlugin = createEmojiPlugin({
});
const { EmojiSuggestions } = emojiPlugin;


const plugins = [PersonMentionPlugin, TagMentionPlugin, linkifyPlugin, emojiPlugin];
const patterns = {
    // FUCK THESE 3 w's! >:(
    protocol: '^(http(s)?(:\/\/))?(www\.)?',
    domain: '[a-zA-Z0-9-_\.]+',
    tld: '(\.[a-zA-Z0-9]{2,})',
    params: '([-a-zA-Z0-9:%_\+.~#?&//=]*)'
};







function mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            props: {
                onChange: this.onChange,
                editorState: this.state.editorState,
                block,
            }
            ,
            editable: false,

        };
    }
    return null;
}

const Media = (props) => {
    const entity = Entity.get(props.block.getEntityAt(0));
    const data = entity.getData();
    // console.log(props);

    return <CrawledCard block={props.blockProps.block}
                        editorState={props.blockProps.editorState}
                        onChange={props.blockProps.onChange}
                        image={data.image}
                        author={data.author}
                        description={data.description}
                        url={data.url}
                        title={data.title}/>;
};
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

const styles = {
    root: {
        fontFamily: '\'Helvetica\', sans-serif',
        padding: 20
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 90,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    bold:{
        fontWeight:'bold !important'
    },
    italic:{
        fontStyle:'italic !important'
    },
    underline:{
        textDecoration: 'underline !important'
    },
    monospace:{
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace !important',
    },
    postBtn:{
        textDecoration: 'none !important'
    }


};


function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}
class HomeEditor extends Component {


    constructor(props){
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            personSuggestions: PersonMentions,
            tagSuggestions: TagMentions,
            url: '',
            urlType: '',
            readOnly:false,
        };
        this.blockRenderMap = Map({
            person: {
                element: 'span',
            },
            tag: {
                element: 'span',
            },
            link: {
                element: 'div',
            },
            emoji: {
                element: 'div',
            },

        },()=>{
            console.log("here?");
        }).merge(DefaultDraftBlockRenderMap);


        this.confirmMedia = this._confirmMedia.bind(this);
        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

    }
    _onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    _confirmMedia(data) {

        const {editorState} = this.state;
        const entityKey = Entity.create(
            'image',
            'IMMUTABLE',
            data);

        const lastState =   AtomicBlockUtils.insertAtomicBlock(
            editorState,
            entityKey,
            ' '
        );
        this.setState({
                editorState:EditorState.forceSelection(
                    lastState
                    ,lastState.getCurrentContent().getSelectionAfter())
            }
        )
    }



    myKeyBindingFn(e) {
        if (e.keyCode === 13) {
            var p = patterns;
            var pattern = new RegExp(p.protocol + p.domain + p.tld + p.params, 'gi');
            const contentState = this.state.editorState.getCurrentContent();
            const selectionState = this.state.editorState.getSelection();
            const key = selectionState.getStartKey();
            const blockMap = contentState.getBlockMap();
            const block = blockMap.get(key);
            var url = block.getText();

            var res = pattern.test(url);

            if(res==true) {

                var ROOT_URL = "http://127.0.0.1:8000/";
                var data = new FormData();
                data.append("url", url);
                axios.post(`${ROOT_URL}`,data,{
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }).then(response => {

                    this.confirmMedia(response.data);

                    return 'thumbnail';
                }).catch(response => {
                    console.log("nb",response);
                });
            }
        }
        return getDefaultKeyBinding(e);
    }

    onChange = (editorState) => {
        this.setState({
            editorState,
        });

    };

    onPersonSearchChange = ({ value }) => {
        this.setState({
            personSuggestions: defaultSuggestionsFilter(value, PersonMentions),
        });
    };

    onTagSearchChange = ({ value }) => {
        this.setState({
            tagSuggestions:defaultSuggestionsFilter(value, TagMentions),
        });
    };


    focus = () => {
        this.editor.focus();
    };
    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }
    post(){
        console.log(convertToRaw(this.state.editorState.getCurrentContent()));
        let rawHtmlArray = convertToRaw(this.state.editorState.getCurrentContent()).blocks;
        var checked = false;
        for(let i=0; i<rawHtmlArray.length; i++){
            console.log(rawHtmlArray[i].text.trim());
            if(rawHtmlArray[i].text.trim()!=""){
                checked=true;
            }
        }
        if(!checked){
            alert("내용을 입력해 주세요.");
        }
        else {
            // this.setState({readOnly: true});
            var markup = document.documentElement.getElementsByClassName('DraftEditor-editorContainer')[0];
            this.props.saveFeed(markup);
        }

    }
    render() {
        const {editorState} = this.state;
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }
        return (

            <div>
                <Card className="row graphFeed"
                      onOver={card => card.setLevel(2)}
                      onOut={card => card.setLevel(1)}
                      key={-1}>
                        <div style={styles.editor} className={editorStyles.editor} onClick={this.focus}>
                            <Editor
                                readOnly = {this.state.readOnly}
                                editorState={this.state.editorState}
                                onChange={this.onChange}
                                plugins={plugins}
                                blockRenderMap={this.blockRenderMap}
                                handleKeyCommand={this.handleKeyCommand}
                                keyBindingFn={this.myKeyBindingFn.bind(this)}
                                blockRendererFn={mediaBlockRenderer.bind(this)}
                                blockStyleFn={getBlockStyle}
                                customStyleMap={styleMap}
                                onTab={this.onTab}
                                ref={(element) => { this.editor = element; }}
                            />
                            <EmojiSuggestions />
                            <MentionSuggestions
                                onSearchChange={this.onPersonSearchChange}
                                suggestions={this.state.personSuggestions}
                                entryComponent={PersonEntry}
                            />
                            <TagMentionSuggestions
                                onSearchChange={this.onTagSearchChange}
                                suggestions={this.state.tagSuggestions}
                                entryComponent={TagEntry}
                            />
                    </div>
                </Card>

                <InlineStyleControls
                    onPost={this.post.bind(this)}
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />


            </div>

        );
    }
}
class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        let style = '';
        switch (this.props.label){
            case 'B':
                style = styles.bold;
                break;
            case 'I':
                style = styles.italic;
                break;
            case 'U':
                style = styles.underline;
                break;
            case 'M':
                style = styles.monospace;
                break;
        }

        return (
            <span style = {styles.button} className={className} onMouseDown={this.onToggle}>
                <div style= {style}>
                    {this.props.label}
                </div>
            </span>
        );
    }
}



var INLINE_STYLES = [
    {label: 'B', style: 'BOLD'},
    {label: 'I', style: 'ITALIC'},
    {label: 'U', style: 'UNDERLINE'},
    {label: 'M', style: 'CODE'},
];

const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
            <span className="RichEditor-styleButton" style={styles.button} onClick={props.onPost}>
                    <div style={styles.postBtn}>
                        올리기
                    </div>
            </span>



        </div>
    );
};

function mapDispatchToProps(dispatch){
    return bindActionCreators({saveFeed }, dispatch);
}




export default connect(null, mapDispatchToProps)(HomeEditor);
