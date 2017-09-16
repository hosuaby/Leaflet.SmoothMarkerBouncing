const rowMap = {
    'a': 0,
    'b': 1,
    'c': 2,
    'd': 3
};

const zeros = Array(16).fill(0);

const identity = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d
 */
export default class Matrix3D {
    #matrix;

    constructor(matrix = zeros) {
        this.#matrix = [...matrix];
    }

    toFormat(...placeholders) {
        placeholders = placeholders.map(Matrix3D.valueNameToIndex);
        let nextPlaceholderIndex = 0;

        let fnBody = this.#matrix
                .map((value, index) => {
                    return index === placeholders[nextPlaceholderIndex]
                            ? `'+arguments[${nextPlaceholderIndex++}]+'`
                            : value;
                })
                .join(',');
        fnBody = `return ' matrix3d(${fnBody}) ';`;

        function formatFn() {
            return Function.apply(this, [fnBody]);
        }
        formatFn.prototype = Function.prototype;
        return new formatFn();
    }

    toString() {
        return ` matrix3d(${this.#matrix.join(',')}) `;
    }

    static zeros() {
        return new Matrix3D();
    }

    static identity() {
        return new Matrix3D(identity);
    }

    static valueNameToIndex(valueName) {
        return rowMap[valueName[0]] * 4 + parseInt(valueName[1]) - 1;
    }
}
