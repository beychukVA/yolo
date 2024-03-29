import axios from 'axios'
import { RoundDropdown } from 'components/Organisms/ModalLib/Bidding.Modal/G3minBiddingModal/RoundDropdown'
import { API } from 'constants/apiEndPoints'
import { getGameParameters } from 'constants/games'
import { tsvParse, csvParse } from 'd3-dsv'
import { timeParse } from 'd3-time-format'
import ms from 'ms'

function parseData(parse) {
  return function (d) {
    d.date = parse(d.date)
    d.open = +d.open
    d.high = +d.high
    d.low = +d.low
    d.close = +d.close
    d.volume = +d.volume

    return d
  }
}

const parseDate = timeParse('%Y-%m-%d')

export function getData() {
  const promiseCompare = fetch('https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/comparison.tsv')
    .then((response) => response.text())
    .then((data) =>
      tsvParse(data, (d) => {
        d = parseData(parseDate)(d)
        d.SP500Close = +d.SP500Close
        d.AAPLClose = +d.AAPLClose
        d.GEClose = +d.GEClose
        return d
      })
    )
  return promiseCompare
}
