import React, { Component } from 'react';
import { EditorState,getDefaultKeyBinding, KeyBindingUtil, Modifier } from 'draft-js';
import Editor from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'; // eslint-disable-line import/no-unresolved
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import { fromJS } from 'immutable';
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
} // /([www])?\.?((\w+)\.+)([a-zA-Z]{2,})/gi

export default class HomeEditor extends Component {

  state = {
    editorState: EditorState.createEmpty(),
    personSuggestions: PersonMentions,
    tagSuggestions: TagMentions
  };
  handleKeyCommand(command) {
      console.log("hello!",command);
    }
    myKeyBindingFn(e) {
        // var pattern = new RegExp('/^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/');
        if (e.keyCode === 13) {
            var p = patterns;
            var pattern = new RegExp(p.protocol + p.domain + p.tld + p.params, 'gi');
            var url = this.state.editorState.getCurrentContent().getBlockForKey(this.state.editorState.getSelection().getStartKey())._map._root.entries[1][1];
            var res = pattern.test(url);
           console.log("on enter!!!", this.state.editorState.getSelection().getStartKey());
            console.log("god",url,res);
           if(res==true) {
                console.log("hello!", url);
                // return false;
               var ROOT_URL = "http://127.0.0.1:8000/";
               var data = new FormData();
               data.append("url", url);

               axios.post(`${ROOT_URL}`,data,{
                       'content-type': 'application/json',
                       'Access-Control-Allow-Origin': '*'
                   }
                )
                   .then(response => {
                      console.log("good!!!",response);
                       EditorState.moveFocusToEnd(this.state.editorState);
                       let currentHTML = stateToHTML(this.state.editorState.getCurrentContent());
                       console.log("come bak yuri!", currentHTML);
                       currentHTML =   currentHTML + "<ol><li>{response.data.image}</li></ol>";
                       let contentState = stateFromHTML(currentHTML);
                       this.setState({editorState: EditorState.push(this.state.editorState, contentState, 'insert-fragment')});

                   })
                   .catch(response => {
                       console.log("nb",response);
                   });

            } else {
                console.log("not hello!", url);
                // return true;
               EditorState.moveFocusToEnd(this.editorState);
               let currentHTML = stateToHTML(this.editorState.getCurrentContent());
               console.log("come bak yuri!", currentHTML);

            }

        }
        return getDefaultKeyBinding(e);
    }

  onChange = (editorState) => {
      // console.log("hello~ guys~",editorState);
      // console.log("hello~ guys~",editorState.getCurrentContent());
      // console.log("getSelection", editorState.getSelection());
      // console.log("getAnchorKey", editorState.getSelection().getAnchorKey());
      // console.log("getAnchorOffset", editorState.getSelection().getAnchorOffset());
      // console.log("getEndKey", editorState.getSelection().getEndKey());
      // console.log("getEndOffset", editorState.getSelection().getEndOffset());
      // console.log("getFocusKey", editorState.getSelection().getFocusKey());
      // console.log("getFocusOffset", editorState.getSelection().getFocusOffset());
      // console.log("getHasFocus", editorState.getSelection().getHasFocus());
      // console.log("getIsBackward", editorState.getSelection().getIsBackward());
      // console.log("getStartKey", editorState.getSelection().getStartKey());
      // console.log("getStartOffset", editorState.getSelection().getStartOffset());
      // console.log("isCollapsed", editorState.getSelection().isCollapsed());
      // console.log("serialize", editorState.getSelection().serialize());

      // console.log("getSelectionBefore",editorState.getCurrentContent().getSelectionBefore());
      // console.log("getSelectionAfter",editorState.getCurrentContent().getSelectionAfter());
      // console.log("getBlockForKey",editorState.getCurrentContent().getBlockForKey());
      // console.log("getKeyBefore",editorState.getCurrentContent().getKeyBefore());
      // console.log("getKeyAfter",editorState.getCurrentContent().getKeyAfter());
      // console.log("getLastChangeType",editorState.getLastChangeType());
      // console.log("getNativelyRenderedContent",editorState.getNativelyRenderedContent());
      // console.log("getLastChangeType",editorState.getLastChangeType());
      // console.log("getLastChangeType",editorState.getLastChangeType());
      // console.log("getBlockBefore",editorState.getCurrentContent().getBlockBefore());
      // console.log("getBlockAfter",editorState.getCurrentContent().getBlockAfter());
      console.log("getBlocksAsArray",editorState.getCurrentContent().getBlocksAsArray());
      // for(var i=0; i<editorState.getCurrentContent().getBlocksAsArray().length; i++){
      //     console.log(i,editorState.getCurrentContent().getBlocksAsArray()[i].getData());
      //     console.log(i,editorState.getCurrentContent().getBlocksAsArray()[i].getCharacterList());
      //     console.log(i,editorState.getCurrentContent().getBlocksAsArray()[i].getText());
      // }
      console.log("getPlainText",editorState.getCurrentContent().getPlainText());
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

  render() {
    return (
        <div className={editorStyles.editor} onClick={this.focus}>
          <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.myKeyBindingFn.bind(this)}
              plugins={plugins}
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