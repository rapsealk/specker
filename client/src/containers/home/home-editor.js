import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'; // eslint-disable-line import/no-unresolved
import { fromJS } from 'immutable';
import editorStyles from 'draft-js-mention-plugin/lib/plugin.css';


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
const plugins = [PersonMentionPlugin, TagMentionPlugin];

export default class HomeEditor extends Component {

  state = {
    editorState: EditorState.createEmpty(),
    personSuggestions: PersonMentions,
    tagSuggestions: TagMentions
  };

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

  render() {
    return (
        <div className={editorStyles.editor} onClick={this.focus}>
          <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
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