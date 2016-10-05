import React, { Component } from 'react';
import MasonryInfiniteScroller from 'react-masonry-infinite';
import qwest from 'qwest';
import Card from 'react-material-card';
import HomeEditor from './home-editor';


const api = {
    baseUrl: 'https://api.soundcloud.com',
    client_id: 'caf73ef1e709f839664ab82bef40fa96'
};
const sizes = ()=> {
    let size=[];
    size.push({columns:1, gutter:10});
    for(var i=0; i<30; i++){
        size.push({mq:50*i+'px', columns:1, gutter:10+i});
    }
    return size;
};




class HomeBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            hasMoreItems: true,
            nextHref: null
        };

    }



    loadItems(page) {
        var self = this;

        var url = api.baseUrl + '/users/8665091/favorites';
        if(this.state.nextHref) {
            url = this.state.nextHref;
        }

        qwest.get(url, {
            client_id: api.client_id,
            linked_partitioning: 1,
            page_size: 10
        }, {
            cache: true
        })
            .then(function(xhr, resp) {
                if(resp) {
                    var tracks = self.state.tracks;
                    resp.collection.map((track) => {
                        if(track.artwork_url == null) {
                            track.artwork_url = track.user.avatar_url;
                        }

                        tracks.push(track);
                    });

                    if(resp.next_href) {
                        self.setState({
                            tracks: tracks,
                            nextHref: resp.next_href
                        });
                    } else {
                        self.setState({
                            hasMoreItems: false
                        });
                    }
                }
            });
    }



    render() {
        const loader = <img src="../../../style/image/loader.gif" width="20%" height="auto" className="loader" />;
        const {editorState} = this.state;

        var items = [];
        this.state.tracks.map((track, i) => {
            items.push(
                <div className="homeCard row">
                <div className="thumb">
                    <img src="http://lorempixel.com/400/800" alt="" />
                </div>
                <Card
                    onOver={card => card.setLevel(2)}
                    onOut={card => card.setLevel(1)}
                      key={i}>
                    <a href={track.permalink_url} target="_blank">
                        <img width="100%" height="auto" src={track.artwork_url}  />
                        <p className="title">{track.title}</p>
                    </a>

                </Card>
                </div>
            );
        });

        return (
            <div className="homeBody">

                <div className="thumb myThumb">
                    <img src={this.state.tracks.artwork_url? this.state.tracks[0].artwork_url:""} alt="" />
                </div>
                <Card className="row graphFeed"
                      onOver={card => card.setLevel(2)}
                      onOut={card => card.setLevel(1)}
                      key={-1}>
                    <HomeEditor />
                </Card>

            <MasonryInfiniteScroller    pageStart={0}
                                        loadMore={this.loadItems.bind(this)}
                                        hasMore={this.state.hasMoreItems}
                                        loader={loader}
                                        sizes={sizes()}
                                        style={{ width:'100% !important', margin:'0 0 15% 0 !important'}}>


                {items}


                </MasonryInfiniteScroller>
            </div>
        )
    }
}
export default HomeBody;

