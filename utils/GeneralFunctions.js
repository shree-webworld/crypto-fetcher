

export const numberWithCommas = (x) =>{
                                          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                      };


          export const chartDays = [
                                        {
                                          label: "24 Hours",
                                          value: 1,
                                        },
                                        {
                                          label: "30 Days",
                                          value: 30,
                                        },
                                        {
                                          label: "3 Months",
                                          value: 90,
                                        },
                                        {
                                          label: "1 Year",
                                          value: 365,
                                        },
                                  ];
