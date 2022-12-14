import { atom } from "recoil";

export const currencyState = atom({
                                            key: "currencyStateKey",
                                            default: "INR",
                                          });

export const currencySymbolState = atom({
                                                    key: "currencySymbolStateKey",
                                                    default: "₹",
                                              });
