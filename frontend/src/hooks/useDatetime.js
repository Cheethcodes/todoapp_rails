import { useMemo } from 'react'

const useDatetime = (setTimezone) => {
    const getTimezone = useMemo(() => {
        const offset = new Date().getTimezoneOffset()
        const difference = (offset / 60 * -1).toString()
        const differenceArray = difference.split('.')
        var returnUtcTimezone = ''

        if (difference.length === 1) {
            if (!differenceArray[0].includes('-')) {
                returnUtcTimezone += '+'
            }

            returnUtcTimezone += differenceArray[0].padStart(2, 0) + ':00'
        }
        else {
            if (!differenceArray[0].includes('-')) {
                returnUtcTimezone += '+'
            }

            returnUtcTimezone += differenceArray[0].padStart(2, 0) + ':30'
        }

        setTimezone(returnUtcTimezone)
    }, [])
}

export default useDatetime
