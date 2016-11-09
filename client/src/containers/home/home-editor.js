import React, { Component } from 'react';
import { EditorState,getDefaultKeyBinding, KeyBindingUtil,
    Modifier,RichUtils,  DefaultDraftBlockRenderMap,
    EditorBlock, AtomicBlockUtils, Entity
} from 'draft-js';

import Editor from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'; // eslint-disable-line import/no-unresolved
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import { fromJS, Map } from 'immutable';
import editorStyles from 'draft-js-mention-plugin/lib/plugin.css';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import axios from 'axios';

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
    // {
    //   name: 'max',
    //   title: 'Travels around the world, brews coffee, skis mountains and makes stuff on the web.',
    //   avatar: 'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg',
    // },
    // {
    //   name: 'nik',
    //   title: 'Passionate about Software Architecture, UX, Skiing & Triathlons',
    //   avatar: 'https://pbs.twimg.com/profile_images/535634005769457664/Ppl32NaN_400x400.jpeg',
    // },
    // {
    //   name: 'pascal',
    //   title: 'HeathIT hacker and researcher',
    //   avatar: 'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
    // },
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

const plugins = [PersonMentionPlugin, TagMentionPlugin, linkifyPlugin];
const patterns = {
    // FUCK THESE 3 w's! >:(
    protocol: '^(http(s)?(:\/\/))?(www\.)?',
    domain: '[a-zA-Z0-9-_\.]+',
    tld: '(\.[a-zA-Z0-9]{2,})',
    params: '([-a-zA-Z0-9:%_\+.~#?&//=]*)'
}; // /([www])?\.?((\w+)\.+)([a-zA-Z]{2,})/gi


class TodoBlock extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        console.log("todoblock");
        console.log(this.props);
        return (
            <div className={'block-todo-completed'}>

                <img src={this.props.myData} width={100} alt=""/>

            </div>
        );


    }
}




function mediaBlockRenderer(block) {
    console.log(block);

    if (block.getType() === 'atomic') {
        console.log("hello!");
        console.log(block);
        return {
            component: Media,
            editable: false,

        };
    }

    return null;
}

const Image = (props) => {
    return <img src={props.src} style={styles.media} />;
};

const Audio = (props) => {
    return <audio controls src={props.src} style={styles.media} />;
};

const Video = (props) => {
    return <video controls src={props.src} style={styles.media} />;
};
const Media = (props) => {
    const entity = Entity.get(props.block.getEntityAt(0));
    const data = entity.getData();
    console.log(data);
    // const type = entity.getType();

    // if (type === 'audio') {
    //     media = <Audio src={src} />;
    // } else if (type === 'image') {
    //     media = <Image src={src} />;
    // } else if (type === 'video') {
    //     media = <Video src={src} />;
    // }

    return <TodoBlock myData={data.image} />;
};

export default class HomeEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            personSuggestions: PersonMentions,
            tagSuggestions: TagMentions,
            url: '',
            urlType: '',
        };

        // this.addAudio = this._addAudio.bind(this);
        // this.addImage = this._addImage.bind(this);
        // this.addVideo = this._addVideo.bind(this);
        this.confirmMedia = this._confirmMedia.bind(this);
        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        // this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);

    }

    _confirmMedia(data) {

        const {editorState} = this.state;
        const contentState = editorState.getCurrentContent();
        console.log(editorState);
        const selectionState =editorState.getSelection();
        const entityKey = Entity.create(
            'image',
            'IMMUTABLE',
            data);
        // const contentStateWithEntity = Modifier.applyEntity(contentState, selectionState, entityKey);
        // const contentStateWithEntityAfter =Modifier.setBlockData(contentStateWithEntity, selectionState, Map({
        //     data
        // }));
        // const newEditorState = EditorState.set(editorState, {currentContent: contentStateWithEntity});

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
        // var pattern = new RegExp('/^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/');
        if (e.keyCode === 13) {
            var p = patterns;
            var pattern = new RegExp(p.protocol + p.domain + p.tld + p.params, 'gi');

            // var url = this.state.editorState.getCurrentContent().getBlockForKey(this.state.editorState.getSelection().getStartKey())._map._root.entries[1][1];
            const contentState = this.state.editorState.getCurrentContent();
            const selectionState = this.state.editorState.getSelection();
            const key = selectionState.getStartKey();
            const blockMap = contentState.getBlockMap();
            const block = blockMap.get(key);
            // let newText = '';
            var url = block.getText();
            // var url = this.state.editorState.getCurrentContent().getText();

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
    render() {
        return (
            <div className={editorStyles.editor} onClick={this.focus}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={plugins}
                    handleKeyCommand={this.handleKeyCommand}
                    keyBindingFn={this.myKeyBindingFn.bind(this)}
                    blockRendererFn={mediaBlockRenderer.bind(this)}
                    ref={(element) => { this.editor = element; }}
                />
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
        );
    }
}