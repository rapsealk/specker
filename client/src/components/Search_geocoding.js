import React , {Component} from 'react';
import Search from './Search-GoogleMap';

export default class Search_geocoding extends Component {
    /*
    *  2016.9.30
    *  GeoCoding  구글 맵을 통해서 사용자가 검색했을 때
    *  state에  latitude와 longtitude를 저장하게 함
    *
    *
    * */

    constructor(props) {
        super(props);
        this.state = {
            currentAddress: null,
            mapCoordinates: {
                lat: null,
                lng: null
            }
        };
    }


    searchForAddress(address) {

        var self = this;

        // We will use GMaps' geocode functionality,
        // which is built on top of the Google Maps API

        /*
        * GMaps 는 google api로 index.html에서 include함.
        * index.html에서 구글 api 키를 써줬는데
        * 쿼리 한계가 있음.
        * */

        GMaps.geocode({
            address: address,
            callback: function (results, status) {

                if (status !== 'OK') return;

                var latlng = results[0].geometry.location;

                self.setState({
                    currentAddress: results[0].formatted_address,
                    mapCoordinates: {
                        lat: latlng.lat(),
                        lng: latlng.lng()
                    }
                });
                console.log(latlng.lat());
            }
        });

    }

    render(){
        return (

            <div>
                <Search onSearch={this.searchForAddress.bind(this)} />
            </div>


        );
    }
}