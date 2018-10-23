import React from 'react'
import './flight-search-form.scss'
import Results from './results'

const flightObj = {
  availableFlights: [
      {
        fare: 'Rs 9.500.00',
        aiNumber: 'AI-202',
        depart: '8:00AM',
        arrival: '10:00AM',
        srcCityCode: 'PNQ',
        destCityCode: 'DEL',
        srcCity: 'Pune',
        destCity: 'Delhi',
        date: '2018-10-05',
        availableSeats: '10'
      },
      {
        fare: 'Rs 9.000.00',
        aiNumber: 'AI-203',
        depart: '10:00AM',
        arrival: '12:00pm',
        srcCityCode: 'PNQ',
        destCityCode: 'DEL',
        srcCity: 'Pune',
        destCity: 'Delhi',
        date: '2018-10-05',
        availableSeats: '10'
      }, {
          fare: 'Rs 9.100.00',
          aiNumber: 'AI-204',
          depart: '10:00AM',
          arrival: '11:00AM',
          srcCityCode: 'PNQ',
          destCityCode: 'HYD',
          srcCity: 'Pune',
          destCity: 'Delhi',
          date: '2018-10-05',
          availableSeats: '10'
        }

    ]
}

class FligtSearchForm extends React.Component {
  constructor () {
      super()
      this.state = {
          originCity: '',
          destCity: '',
          date: '',
          passenger: '',
          isSearchEnabled: false,
          searchResults: []
        }
      this.getFormData = this.getFormData.bind(this)
        this.searchFlight = this.searchFlight.bind(this)
    }

  getFormData (e) {
      let type = e.target.name
      let val = e.target.value
      let _this = this
        switch (type) {
          case 'origin':
            _this.setState({ originCity: val })
            break
            case 'destination':
            _this.setState({ destCity: val })
            break
            case 'date':
            _this.setState({ date: val })
            break
            case 'people':
            _this.setState({ passenger: val })
            break
        }
    }
  searchFlight () {
      let _this = this
      var results = flightObj.availableFlights.filter(function (el) {
          return _this.state.originCity == el.srcCityCode &&
                _this.state.destCity == el.destCityCode &&
                _this.state.date == el.date &&
                parseInt(_this.state.passenger, 10) <= parseInt(el.availableSeats, 10)
        })
        _this.setState({ searchResults: results, isSearchEnabled: true })
    }
  render () {
      let _this = this
      let searchObj = _this.state.isSearchEnabled ? _this.state.searchResults : flightObj.availableFlights
      return (
          <div className='flight-search-main'>
              <div className='flight-search-top-section'>
                  <div className='flight-search-header'>
                      <h1>Flight Search Engine</h1>
                    </div>
                  <div className='flight-search-main-section'>
                      <div className='myrow'>
                          <div className='mycol mycol4'>
                              <div className='form-group-elments'>
                                  <div className='form-element'>
                                      <input type='text' name='origin' placeholder='Enter Origin City' onKeyUp={this.getFormData} />
                                    </div>
                                  <div className='form-element'>
                                      <input type='text' name='destination' placeholder='Enter Destination City' onKeyUp={this.getFormData} />
                                    </div>
                                  <div className='form-element'>
                                      <input type='date' name='date' placeholder='Departure date' onChange={this.getFormData} />
                                    </div>
                                  <div className='form-element'>
                                      <input type='number' name='people' placeholder='Passenger' onKeyUp={this.getFormData} />
                                    </div>
                                  <div className='form-element'>
                                      <input type='button' value='Search' onClick={this.searchFlight} />
                                    </div>
                                </div>
                            </div>
                          <div className='mycol mycol8'>
                              <div className='sub-section-header'>
                                  {_this.state.originCity.length && _this.state.destCity.length ? <div className='main-section-data'>
                                      <h3>{_this.state.originCity + '>' + _this.state.destCity}</h3>
                                    </div> : ''
                                    }
                                </div>
                              <div className='display-section'>
                                  <div className='main-section-data' >
                                      {
                                            searchObj.length ? <Results searchRes={searchObj} />  : 'No Results Found!!'
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FligtSearchForm
