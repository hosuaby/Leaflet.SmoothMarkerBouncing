import test from 'ava';
import Styles from '../src/Styles';
import L from 'leaflet';

test('Test parse', t => {

    // Given
    const cssText = 'margin-left: -12px; margin-top: -41px; width: 25px; height: 41px; z-index: 658; opacity: 0.76';

    // When
    const styles = Styles.parse(cssText);

    // Then
    t.like(styles, {
        'height': '41px',
        'width': '25px',
        'margin-left': '-12px',
        'margin-top': '-41px',
        'outline': 'none'
    });
});

test('Test find opacity', t => {

    // Given
    const styles1 = new Styles({ width: '25px', height: '41px' });
    const styles2 = new Styles({ width: '25px', height: '41px' });
    const styles3 = new Styles({ width: '25px', height: '41px' });

    // When
    styles1.findOpacity({ opacityWhenUnclustered: 0.1, opacity: 0.5 });
    styles2.findOpacity({ opacity: 0.5 });
    styles3.findOpacity({});

    // Then
    t.like(styles1, {
        width: '25px',
        height: '41px',
        opacity: 0.1
    });

    t.like(styles2, {
        width: '25px',
        height: '41px',
        opacity: 0.5
    });

    t.like(styles3, {
        width: '25px',
        height: '41px',
        opacity: 1
    });
});

test('Test copy with styles', t => {

    // Given
    const styles = new Styles({ width: '25px', height: '41px' });

    // When
    const copy = styles.withStyles({
        '--pos-x': '50px',
        '--pos-y': '100px'
    })

    // Then
    t.like(copy, {
        width: '25px',
        height: '41px',
        '--pos-x': '50px',
        '--pos-y': '100px'
    });
});

test('Test toString', t => {

    // Given
    const styles = new Styles({
        'height': '41px',
        'width': '25px',
        'margin-left': '-12px',
        'margin-top': '-41px'
    });

    // When
    const cssText = styles.toString();

    // Then
    t.true(cssText.includes('margin-left: -12px;'));
    t.true(cssText.includes('margin-top: -41px;'));
    t.true(cssText.includes('width: 25px;'));
    t.true(cssText.includes('height: 41px;'));
});

test('Test styles from marker', t => {

    // Given
    const div = document.createElement('div');
    const map = L.map(div).setView([48.847547, 2.351074], 14);
    const marker = L.marker([48.847547, 2.351074]).addTo(map);

    // When
    const styles = Styles.ofMarker(marker);

    // Then
    t.like(styles, {
        width: '25px',
        height: '41px',
        opacity: 1,
        'z-index': 0,
        'outline': 'none'
    });
});
