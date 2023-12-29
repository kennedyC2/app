// Sort according to clicks
export const sortData = (category, brand, color, sex, size) => {

    // sort by brand
    if (brand && !color && !sex && !size) {
        let data = category.filter((item) => {
            return item.brand === brand
        })

        return data
    }

    // sort by brand && color
    if (brand && color && !sex && !size) {
        let data = category.filter((item) => {
            return item.brand === brand && item.dColor === color
        })

        return data
    }

    // sort by brand && color && sex
    if (brand && color && sex && !size) {
        let data = category.filter((item) => {
            return item.brand === brand && item.dColor === color && item.sex === sex
        })

        return data
    }

    // sort by brand && color && sex && size
    if (brand && color && sex && size) {
        let data = category.filter((item) => {
            return item.brand === brand && item.dColor === color && item.sex === sex && item.sizes.hasOwnProperty(size)
        })

        return data
    }

    // ==========================================================

    // sort by color
    if (color && !brand && !sex && !size) {
        let data = category.filter((item) => {
            return item.dColor === color
        })

        return data
    }

    // sort by color && sex
    if (color && !brand && sex && !size) {
        let data = category.filter((item) => {
            return item.dColor === color && item.sex === sex
        })

        return data
    }

    // sort by color && size
    if (color && !sex && size && !brand) {
        let data = category.filter((item) => {
            return item.dColor === color && item.sizes.hasOwnProperty(size)
        })

        return data
    }

    // sort by color && sex && size
    if (color && !brand && sex && size) {
        let data = category.filter((item) => {
            return item.dColor === color && item.sex === sex && item.sizes.hasOwnProperty(size)
        })

        return data
    }

    // ==============================================================

    // sort by sex
    if (sex && !color && !brand && !size) {
        let data = category.filter((item) => {
            console.log(sex)
            return item.sex === sex
        })

        return data
    }

    // sort by sex && brand
    if (sex && !color && brand && !size) {
        let data = category.filter((item) => {
            return item.brand === brand && item.sex === sex
        })

        return data
    }

    // sort by sex && size
    if (sex && !color && !brand && size) {
        let data = category.filter((item) => {
            return item.sex === brand && item.sex === sex && item.sizes.hasOwnProperty(size)
        })

        return data
    }

    // sort by sex && brand && size
    if (sex && !color && brand && size) {
        let data = category.filter((item) => {
            return item.brand === brand && item.sex === sex && item.sizes.hasOwnProperty(size)
        })

        return data
    }

    // ==============================================================

    // sort by size
    if (size && !sex && !color && !brand) {
        let data = category.filter((item) => {
            return item.sizes.hasOwnProperty(size)
        })

        return data
    }

    // sort by size && brand
    if (size && !sex && !color && brand) {
        let data = category.filter((item) => {
            return item.brand === brand && item.sizes.hasOwnProperty(size)
        })

        return data
    }

    // sort by size && color && brand
    if (size && !sex && color && brand) {
        let data = category.filter((item) => {
            return item.brand === brand && item.dColor === color && item.sizes.hasOwnProperty(size)
        })

        return data
    }
}