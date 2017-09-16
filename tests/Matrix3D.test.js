import test from 'ava';
import Matrix3D from '../src/Matrix3D';

test('Test zeros matrix', t => {

    // Given
    const zeros = Matrix3D.zeros();

    // Then
    t.is(zeros.toString(), ' matrix3d(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0) ');
});

test('Test identity matrix', t => {

    // Given
    const identity = Matrix3D.identity();

    // Then
    t.is(identity.toString(), ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1) ');
});

test('Test value name to index', t => {
    t.is(Matrix3D.valueNameToIndex('a1'), 0);
    t.is(Matrix3D.valueNameToIndex('b3'), 6);
    t.is(Matrix3D.valueNameToIndex('d2'), 13);
});

test('Test to format', t => {

    // Given
    const matrix3D = Matrix3D.identity();

    // When
    const format = matrix3D.toFormat('b2', 'd1', 'd2');
    const result = format(0.975609756097561, 100, 101);

    // Then
    t.is(result, ' matrix3d(1,0,0,0,0,0.975609756097561,0,0,0,0,1,0,100,101,0,1) ');
});
