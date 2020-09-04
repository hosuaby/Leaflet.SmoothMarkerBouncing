import _ from 'lodash';

const parisArea = [[48.824384, 2.284298], [48.872054, 2.409782]];

export default function randLatLng() {
    const lat = _.random(parisArea[0][0], parisArea[1][0]);
    const lng = _.random(parisArea[0][1], parisArea[1][1]);
    return [lat, lng];
}
