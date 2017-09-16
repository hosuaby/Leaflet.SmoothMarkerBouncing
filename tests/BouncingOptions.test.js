import test from 'ava';
import BouncingOptions from '../src/BouncingOptions';

test('Test default bouncing options', t => {
    const defaultBouncingOptions = new BouncingOptions();

    t.like(defaultBouncingOptions, {
        bounceHeight: 15,
        contractHeight: 12,
        bounceSpeed: 52,
        contractSpeed: 52,
        shadowAngle: - Math.PI / 4,
        elastic: true,
        exclusive: false
    });
});

test('Test customized bouncing options', t => {
    const customizedBouncingOptions = new BouncingOptions({
        contractHeight: 42,
        exclusive: true
    });

    t.like(customizedBouncingOptions, {
        bounceHeight: 15,
        contractHeight: 42,
        bounceSpeed: 52,
        contractSpeed: 52,
        shadowAngle: - Math.PI / 4,
        elastic: true,
        exclusive: true
    });
});

test('Test clone bouncing options', t => {

    // Given
    const bouncingOptions = new BouncingOptions({
        contractHeight: 42,
        exclusive: true
    });

    // When
    const clonedOptions = new BouncingOptions(bouncingOptions);

    // Then
    t.deepEqual(clonedOptions, bouncingOptions);
    t.not(clonedOptions, bouncingOptions);
});

test('Test override', t => {

    // Given
    const defaultBouncingOptions = new BouncingOptions();

    // When
    const overriddenOptions = defaultBouncingOptions.override({
        contractHeight: 42,
        exclusive: true
    })

    // Then
    t.like(overriddenOptions, {
        bounceHeight: 15,
        contractHeight: 42,
        bounceSpeed: 52,
        contractSpeed: 52,
        shadowAngle: - Math.PI / 4,
        elastic: true,
        exclusive: true
    });
    t.not(overriddenOptions, defaultBouncingOptions);
});
