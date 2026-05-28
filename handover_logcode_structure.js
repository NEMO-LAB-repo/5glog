window.HANDOVER_LOGCODE_STRUCTURE = {
  "0xB821 NR5G RRC OTA Packet": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G RRC OTA Packet": {
      "Version": null,
      "NR RRC Release": null,
      "Physical Cell Id": null,
      "Frequency": null,
      "Sfn": null,
      "ul-dcch": {
        "c1": {
          "rrcReconfigurationComplete": {
            "rrc-TransactionIdentifier": null,
            "criticalExtensions": {
              "rrcReconfigurationComplete": {}
            }
          },
          "measurementReport": {
            "criticalExtensions": {
              "measurementReport": {
                "measResults": {
                  "measId": null,
                  "measResultServingMOList": {
                    "[]": {
                      "servCellId": null,
                      "measResultServingCell": {
                        "physCellId": null,
                        "measResult": {
                          "cellResults": {
                            "resultsSSB-Cell": {
                              "rsrp": null,
                              "rsrq": null,
                              "sinr": null
                            }
                          },
                          "rsIndexResults": {
                            "resultsSSB-Indexes": {
                              "[]": {
                                "ssb-Index": null,
                                "ssb-Results": {
                                  "rsrp": null,
                                  "rsrq": null,
                                  "sinr": null
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "measResultNeighCells": {
                    "measResultListNR": {
                      "[]": {
                        "physCellId": null,
                        "measResult": {
                          "cellResults": {
                            "resultsSSB-Cell": {
                              "rsrp": null,
                              "rsrq": null,
                              "sinr": null
                            }
                          },
                          "rsIndexResults": {
                            "resultsSSB-Indexes": {
                              "[]": {
                                "ssb-Index": null,
                                "ssb-Results": {
                                  "rsrp": null,
                                  "rsrq": null,
                                  "sinr": null
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "measResultListEUTRA": {
                      "[]": {
                        "eutra-PhysCellId": null,
                        "measResult": {
                          "rsrp": null,
                          "rsrq": null
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "rrcSetupComplete": {
            "rrc-TransactionIdentifier": null,
            "criticalExtensions": {
              "rrcSetupComplete": {
                "selectedPLMN-Identity": null,
                "dedicatedNAS-Message": null,
                "ng-5G-S-TMSI-Value": {
                  "ng-5G-S-TMSI-Part2": null
                }
              }
            }
          },
          "securityModeComplete": {
            "rrc-TransactionIdentifier": null,
            "criticalExtensions": {
              "securityModeComplete": {}
            }
          },
          "ueCapabilityInformation": {
            "rrc-TransactionIdentifier": null,
            "criticalExtensions": {
              "ueCapabilityInformation": {
                "ue-CapabilityRAT-ContainerList": {
                  "[]": {
                    "rat-Type": null,
                    "ue-CapabilityRAT-Container": {
                      "accessStratumRelease": null,
                      "pdcp-Parameters": {
                        "supportedROHC-Profiles": {
                          "profile0x0000": null,
                          "profile0x0001": null,
                          "profile0x0002": null,
                          "profile0x0003": null,
                          "profile0x0004": null,
                          "profile0x0006": null,
                          "profile0x0101": null,
                          "profile0x0102": null,
                          "profile0x0103": null,
                          "profile0x0104": null,
                          "profile0x0001-r15": null,
                          "profile0x0002-r15": null,
                          "profile0x0003-r15": null,
                          "profile0x0004-r15": null,
                          "profile0x0006-r15": null,
                          "profile0x0101-r15": null,
                          "profile0x0102-r15": null,
                          "profile0x0103-r15": null,
                          "profile0x0104-r15": null
                        },
                        "maxNumberROHC-ContextSessions": null,
                        "uplinkOnlyROHC-Profiles": null,
                        "continueROHC-Context": null,
                        "shortSN": null
                      },
                      "rlc-Parameters": {
                        "am-WithShortSN": null,
                        "um-WithShortSN": null,
                        "um-WithLongSN": null
                      },
                      "mac-Parameters": {
                        "mac-ParametersXDD-Diff": {
                          "logicalChannelSR-DelayTimer": null,
                          "longDRX-Cycle": null,
                          "multipleSR-Configurations": null
                        }
                      },
                      "phy-Parameters": {
                        "phy-ParametersCommon": {
                          "nzp-CSI-RS-IntefMgmt": null,
                          "dynamicHARQ-ACK-Codebook": null,
                          "semiStaticHARQ-ACK-Codebook": null,
                          "ra-Type0-PUSCH": null,
                          "dynamicSwitchRA-Type0-1-PUSCH": null,
                          "pdsch-MappingTypeA": null,
                          "rateMatchingResrcSetSemi-Static": null,
                          "rateMatchingResrcSetDynamic": null,
                          "bwp-SwitchingDelay": null,
                          "rateMatchingCtrlResrcSetDynamic": null,
                          "maxLayersMIMO-Indication": null
                        },
                        "phy-ParametersFRX-Diff": {
                          "twoFL-DMRS": null,
                          "supportedDMRS-TypeDL": null,
                          "supportedDMRS-TypeUL": null,
                          "onePortsPTRS": null,
                          "pucch-F2-WithFH": null,
                          "pucch-F3-WithFH": null,
                          "tpc-SRS-RNTI": null,
                          "absoluteTPC-Command": null,
                          "pusch-HalfPi-BPSK": null,
                          "pucch-F3-4-HalfPi-BPSK": null,
                          "almostContiguousCP-OFDM-UL": null,
                          "csi-RS-IM-ReceptionForFeedback": {
                            "maxConfigNumberNZP-CSI-RS-PerCC": null,
                            "maxConfigNumberPortsAcrossNZP-CSI-RS-PerCC": null,
                            "maxConfigNumberCSI-IM-PerCC": null,
                            "maxNumberSimultaneousNZP-CSI-RS-PerCC": null,
                            "totalNumberPortsSimultaneousNZP-CSI-RS-PerCC": null
                          },
                          "csi-ReportFramework": {
                            "maxNumberPeriodicCSI-PerBWP-ForCSI-Report": null,
                            "maxNumberAperiodicCSI-PerBWP-ForCSI-Report": null,
                            "maxNumberSemiPersistentCSI-PerBWP-ForCSI-Report": null,
                            "maxNumberPeriodicCSI-PerBWP-ForBeamReport": null,
                            "maxNumberAperiodicCSI-PerBWP-ForBeamReport": null,
                            "maxNumberAperiodicCSI-triggeringStatePerCC": null,
                            "maxNumberSemiPersistentCSI-PerBWP-ForBeamReport": null,
                            "simultaneousCSI-ReportsPerCC": null
                          },
                          "mux-SR-HARQ-ACK-CSI-PUCCH-OncePerSlot": {
                            "sameSymbol": null
                          },
                          "dl-SchedulingOffset-PDSCH-TypeA": null,
                          "oneFL-DMRS-TwoAdditionalDMRS-UL": null,
                          "twoFL-DMRS-TwoAdditionalDMRS-UL": null
                        },
                        "phy-ParametersFR1": {
                          "pdsch-256QAM-FR1": null,
                          "pdsch-RE-MappingFR1-PerSymbol": null,
                          "pdsch-RE-MappingFR1-PerSlot": null
                        }
                      },
                      "rf-Parameters": {
                        "supportedBandListNR": {
                          "[]": {
                            "bandNR": null,
                            "mimo-ParametersPerBand": {
                              "tci-StatePDSCH": {
                                "maxNumberConfiguredTCI-StatesPerCC": null,
                                "maxNumberActiveTCI-PerBWP": null
                              },
                              "pusch-TransCoherence": null,
                              "periodicBeamReport": null,
                              "aperiodicBeamReport": null,
                              "maxNumberNonGroupBeamReporting": null,
                              "maxNumberSSB-BFD": null,
                              "maxNumberCSI-RS-SSB-CBD": null,
                              "beamReportTiming": {
                                "scs-30kHz": null,
                                "scs-15kHz": null
                              },
                              "beamManagementSSB-CSI-RS": {
                                "maxNumberSSB-CSI-RS-ResourceOneTx": null,
                                "maxNumberCSI-RS-Resource": null,
                                "maxNumberCSI-RS-ResourceTwoTx": null,
                                "supportedCSI-RS-Density": null,
                                "maxNumberAperiodicCSI-RS-Resource": null
                              },
                              "codebookParameters": {
                                "type1": {
                                  "singlePanel": {
                                    "supportedCSI-RS-ResourceList": {
                                      "[]": {
                                        "maxNumberTxPortsPerResource": null,
                                        "maxNumberResourcesPerBand": null,
                                        "totalNumberTxPortsPerBand": null
                                      }
                                    },
                                    "modes": null,
                                    "maxNumberCSI-RS-PerResourceSet": null
                                  }
                                }
                              },
                              "csi-RS-IM-ReceptionForFeedback": {
                                "maxConfigNumberNZP-CSI-RS-PerCC": null,
                                "maxConfigNumberPortsAcrossNZP-CSI-RS-PerCC": null,
                                "maxConfigNumberCSI-IM-PerCC": null,
                                "maxNumberSimultaneousNZP-CSI-RS-PerCC": null,
                                "totalNumberPortsSimultaneousNZP-CSI-RS-PerCC": null
                              },
                              "csi-ReportFramework": {
                                "maxNumberPeriodicCSI-PerBWP-ForCSI-Report": null,
                                "maxNumberAperiodicCSI-PerBWP-ForCSI-Report": null,
                                "maxNumberSemiPersistentCSI-PerBWP-ForCSI-Report": null,
                                "maxNumberPeriodicCSI-PerBWP-ForBeamReport": null,
                                "maxNumberAperiodicCSI-PerBWP-ForBeamReport": null,
                                "maxNumberAperiodicCSI-triggeringStatePerCC": null,
                                "maxNumberSemiPersistentCSI-PerBWP-ForBeamReport": null,
                                "simultaneousCSI-ReportsPerCC": null
                              },
                              "csi-RS-ForTracking": {
                                "maxBurstLength": null,
                                "maxSimultaneousResourceSetsPerCC": null,
                                "maxConfiguredResourceSetsPerCC": null,
                                "maxConfiguredResourceSetsAllCC": null
                              }
                            },
                            "multipleTCI": null,
                            "bwp-SameNumerology": null,
                            "pusch-256QAM": null,
                            "ue-PowerClass": null,
                            "channelBWs-DL": {
                              "fr1": {
                                "scs-15kHz": null,
                                "scs-30kHz": null,
                                "scs-60kHz": null
                              }
                            },
                            "channelBWs-UL": {
                              "fr1": {
                                "scs-15kHz": null,
                                "scs-30kHz": null,
                                "scs-60kHz": null
                              }
                            },
                            "maxUplinkDutyCycle-PC2-FR1": null,
                            "channelBWs-DL-v1590": {
                              "fr1": {
                                "scs-30kHz": null
                              }
                            },
                            "channelBWs-UL-v1590": {
                              "fr1": {
                                "scs-30kHz": null
                              }
                            },
                            "rateMatchingLTE-CRS": null
                          }
                        },
                        "supportedBandCombinationList": {
                          "[]": {
                            "bandList": {
                              "[]": {
                                "nr": {
                                  "bandNR": null,
                                  "ca-BandwidthClassDL-NR": null,
                                  "ca-BandwidthClassUL-NR": null
                                }
                              }
                            },
                            "featureSetCombination": null,
                            "powerClass-v1530": null
                          }
                        },
                        "appliedFreqBandListFilter": {
                          "[]": {
                            "bandInformationNR": {
                              "bandNR": null
                            }
                          }
                        },
                        "supportedBandCombinationList-v1540": {
                          "[]": {
                            "bandList-v1540": {
                              "[]": {
                                "srs-TxSwitch": {
                                  "supportedSRS-TxPortSwitch": null
                                }
                              }
                            },
                            "ca-ParametersNR-v1540": {
                              "csi-RS-IM-ReceptionForFeedbackPerBandComb": {
                                "maxNumberSimultaneousNZP-CSI-RS-ActBWP-AllCC": null,
                                "totalNumberPortsSimultaneousNZP-CSI-RS-ActBWP-AllCC": null
                              },
                              "simultaneousCSI-ReportsAllCC": null
                            }
                          }
                        },
                        "srs-SwitchingTimeRequested": null,
                        "supportedBandListEUTRA": {
                          "[]": {
                            "bandEUTRA": null,
                            "halfDuplex": null
                          }
                        }
                      },
                      "measAndMobParameters": {
                        "measAndMobParametersCommon": {
                          "ssb-RLM": null,
                          "eventB-MeasAndReport": null,
                          "handoverFDD-TDD": null,
                          "eutra-CGI-Reporting": null,
                          "nr-CGI-Reporting": null,
                          "periodicEUTRA-MeasAndReport": null
                        },
                        "measAndMobParametersXDD-Diff": {
                          "intraAndInterF-MeasAndReport": null,
                          "eventA-MeasAndReport": null,
                          "handoverInterF": null,
                          "handoverLTE-EPC": null
                        },
                        "measAndMobParametersFRX-Diff": {
                          "ss-SINR-Meas": null,
                          "handoverInterF": null,
                          "handoverLTE-EPC": null,
                          "simultaneousRxDataSSB-DiffNumerology": null
                        }
                      },
                      "tdd-Add-UE-NR-Capabilities": {
                        "phy-ParametersXDD-Diff": {
                          "dl-SchedulingOffset-PDSCH-TypeA": null
                        }
                      },
                      "featureSets": {
                        "featureSetsDownlink": {
                          "[]": {
                            "featureSetListPerDownlinkCC": {
                              "[]": null
                            },
                            "ue-SpecificUL-DL-Assignment": null
                          }
                        },
                        "featureSetsDownlinkPerCC": {
                          "[]": {
                            "supportedSubcarrierSpacingDL": null,
                            "supportedBandwidthDL": {
                              "fr1": null
                            },
                            "channelBW-90mhz": null,
                            "maxNumberMIMO-LayersPDSCH": null,
                            "supportedModulationOrderDL": null
                          }
                        },
                        "featureSetsUplink": {
                          "[]": {
                            "featureSetListPerUplinkCC": {
                              "[]": null
                            },
                            "supportedSRS-Resources": {
                              "maxNumberAperiodicSRS-PerBWP": null,
                              "maxNumberAperiodicSRS-PerBWP-PerSlot": null,
                              "maxNumberPeriodicSRS-PerBWP": null,
                              "maxNumberPeriodicSRS-PerBWP-PerSlot": null,
                              "maxNumberSemiPersistentSRS-PerBWP": null,
                              "maxNumberSemiPersistentSRS-PerBWP-PerSlot": null,
                              "maxNumberSRS-Ports-PerResource": null
                            }
                          }
                        },
                        "featureSetsUplinkPerCC": {
                          "[]": {
                            "supportedSubcarrierSpacingUL": null,
                            "supportedBandwidthUL": {
                              "fr1": null
                            },
                            "mimo-CB-PUSCH": {
                              "maxNumberMIMO-LayersCB-PUSCH": null,
                              "maxNumberSRS-ResourcePerSet": null
                            },
                            "supportedModulationOrderUL": null,
                            "channelBW-90mhz": null
                          }
                        },
                        "featureSetsDownlink-v1540": {
                          "[]": {
                            "twoFL-DMRS-TwoAdditionalDMRS-DL": null,
                            "additionalDMRS-DL-Alt": null
                          }
                        }
                      },
                      "featureSetCombinations": {
                        "[]": {
                          "[]": {
                            "[]": {
                              "nr": {
                                "downlinkSetNR": null,
                                "uplinkSetNR": null
                              }
                            }
                          }
                        }
                      },
                      "nonCriticalExtension": {
                        "interRAT-Parameters": {
                          "eutra": {
                            "supportedBandListEUTRA": {
                              "[]": null
                            },
                            "eutra-ParametersCommon": {
                              "mfbi-EUTRA": null
                            }
                          }
                        },
                        "nonCriticalExtension": {
                          "ims-Parameters": {
                            "ims-ParametersFRX-Diff": {
                              "voiceOverNR": null
                            }
                          },
                          "lateNonCriticalExtension": {
                            "featureGroupIndRel9Add-r9": {
                              "Inter-RAT ANR features for UTRAN FDD": null,
                              "Inter-RAT ANR features for GERAN": null,
                              "Inter-RAT ANR features for 1xRTT": null,
                              "Inter-RAT ANR features for HRPD": null,
                              "Inter-RAT ANR features for UTRAN TDD": null,
                              "EUTRA RRC_CONNECTED to UTRA TDD CELL_DCH PS handover": null,
                              "UTRAN TDD measurements, reporting and measurement reporting event B2 in E-UTRA connected mode": null,
                              "EUTRA RRC_CONNECTED to UTRA TDD CELL_DCH CS handover": null,
                              "Measurement reporting event: Event B1 - Neighbour > threshold for UTRAN FDD": null,
                              "DCI format 3a": null
                            },
                            "fdd-Add-UE-EUTRA-Capabilities-r9": {
                              "featureGroupIndicators-r9": {
                                "Intra-subframe freq hopping for PUSCH scheduled by UL grant; DCI format 3a; Aperiodic CQI/PMI/RI report on PUSCH: Mode 2-0 & 2-2": null,
                                "Simultaneous CQI & ACK/NACK on PUCCH (format 2a/2b); Absolute TPC command for PUSCH; Resource alloc type 1 for PDSCH; Periodic CQI/PMI/RI report on PUCCH: Mode 2-0 & 2-1": null,
                                "5bit RLC UM SN; 7bit PDCP SN": null,
                                "Short DRX cycle": null,
                                "Long DRX cycle; DRX command MAC control element": null,
                                "Prioritised bit rate": null,
                                "RLC UM": null,
                                "EUTRA RRC_CONNECTED to UTRA CELL_DCH PS handover": null,
                                "EUTRA RRC_CONNECTED to GERAN GSM_Dedicated handover": null,
                                "EUTRA RRC_CONNECTED to GERAN (Packet) Idle by Cell Change Order; EUTRA RRC_CONNECTED to GERAN (Packet) Idle by Cell Change Order with NACC": null,
                                "EUTRA RRC_CONNECTED to CDMA2000 1xRTT CS Active handover": null,
                                "EUTRA RRC_CONNECTED to CDMA2000 HRPD Active handover": null,
                                "Inter-frequency handover (within FDD or TDD)": null,
                                "Measurement reporting event: Event A4 - Neighbour > threshold; Measurement reporting event: Event A5 - Serving < threshold1 & Neighbour > threshold2": null,
                                "Measurement reporting event: Event B1 - Neighbour > threshold": null,
                                "non-ANR related periodical measurement reporting": null,
                                "ANR related intra-frequency measurement reporting events": null,
                                "ANR related inter-frequency measurement reporting events": null,
                                "ANR related inter-RAT measurement reporting events": null,
                                "SRB1 and SRB2 for DCCH + 8x AM DRB; SRB1 and SRB2 for DCCH + 5x AM DRB + 3x UM DRB (if indicator 7 is supported)": null,
                                "Predefined intra- and inter-subframe frequency hopping for PUSCH with N_sb > 1; Predefined inter-subframe frequency hopping for PUSCH with N_sb > 1": null,
                                "UTRAN measurements, reporting and measurement reporting event B2 in E-UTRA connected mode": null,
                                "GERAN measurements, reporting and measurement reporting event B2 in E-UTRA connected mode": null,
                                "1xRTT measurements, reporting and measurement reporting event B2 in E-UTRA connected mode": null,
                                "Inter-frequency measurements and reporting in E-UTRA connected mode": null,
                                "HRPD measurements, reporting and measurement reporting event B2 in E-UTRA connected mode": null,
                                "EUTRA RRC_CONNECTED to UTRA CELL_DCH CS handover": null,
                                "TTI bundling": null,
                                "Semi-Persistent Scheduling": null,
                                "Handover between FDD and TDD": null,
                                "Mechanisms defined for cells broadcasting multi band information": null
                              },
                              "featureGroupIndRel9Add-r9": {
                                "Inter-RAT ANR features for UTRAN FDD": null,
                                "Inter-RAT ANR features for GERAN": null,
                                "Inter-RAT ANR features for 1xRTT": null,
                                "Inter-RAT ANR features for HRPD": null,
                                "Inter-RAT ANR features for UTRAN TDD": null,
                                "EUTRA RRC_CONNECTED to UTRA TDD CELL_DCH PS handover": null,
                                "UTRAN TDD measurements, reporting and measurement reporting event B2 in E-UTRA connected mode": null,
                                "EUTRA RRC_CONNECTED to UTRA TDD CELL_DCH CS handover": null,
                                "Measurement reporting event: Event B1 - Neighbour > threshold for UTRAN FDD": null,
                                "DCI format 3a": null
                              }
                            },
                            "tdd-Add-UE-EUTRA-Capabilities-r9": {
                              "featureGroupIndicators-r9": {
                                "Intra-subframe freq hopping for PUSCH scheduled by UL grant; DCI format 3a; Aperiodic CQI/PMI/RI report on PUSCH: Mode 2-0 & 2-2": null,
                                "Simultaneous CQI & ACK/NACK on PUCCH (format 2a/2b); Absolute TPC command for PUSCH; Resource alloc type 1 for PDSCH; Periodic CQI/PMI/RI report on PUCCH: Mode 2-0 & 2-1": null,
                                "5bit RLC UM SN; 7bit PDCP SN": null,
                                "Short DRX cycle": null,
                                "Long DRX cycle; DRX command MAC control element": null,
                                "Prioritised bit rate": null,
                                "RLC UM": null,
                                "EUTRA RRC_CONNECTED to UTRA CELL_DCH PS handover": null,
                                "EUTRA RRC_CONNECTED to GERAN GSM_Dedicated handover": null,
                                "EUTRA RRC_CONNECTED to GERAN (Packet) Idle by Cell Change Order; EUTRA RRC_CONNECTED to GERAN (Packet) Idle by Cell Change Order with NACC": null,
                                "EUTRA RRC_CONNECTED to CDMA2000 1xRTT CS Active handover": null,
                                "EUTRA RRC_CONNECTED to CDMA2000 HRPD Active handover": null,
                                "Inter-frequency handover (within FDD or TDD)": null,
                                "Measurement reporting event: Event A4 - Neighbour > threshold; Measurement reporting event: Event A5 - Serving < threshold1 & Neighbour > threshold2": null,
                                "Measurement reporting event: Event B1 - Neighbour > threshold": null,
                                "non-ANR related periodical measurement reporting": null,
                                "ANR related intra-frequency measurement reporting events": null,
                                "ANR related inter-frequency measurement reporting events": null,
                                "ANR related inter-RAT measurement reporting events": null,
                                "SRB1 and SRB2 for DCCH + 8x AM DRB; SRB1 and SRB2 for DCCH + 5x AM DRB + 3x UM DRB (if indicator 7 is supported)": null,
                                "Predefined intra- and inter-subframe frequency hopping for PUSCH with N_sb > 1; Predefined inter-subframe frequency hopping for PUSCH with N_sb > 1": null,
                                "UTRAN measurements, reporting and measurement reporting event B2 in E-UTRA connected mode": null,
                                "GERAN measurements, reporting and measurement reporting event B2 in E-UTRA connected mode": null,
                                "1xRTT measurements, reporting and measurement reporting event B2 in E-UTRA connected mode": null,
                                "Inter-frequency measurements and reporting in E-UTRA connected mode": null,
                                "HRPD measurements, reporting and measurement reporting event B2 in E-UTRA connected mode": null,
                                "EUTRA RRC_CONNECTED to UTRA CELL_DCH CS handover": null,
                                "TTI bundling": null,
                                "Semi-Persistent Scheduling": null,
                                "Handover between FDD and TDD": null,
                                "Mechanisms defined for cells broadcasting multi band information": null
                              },
                              "featureGroupIndRel9Add-r9": {
                                "Inter-RAT ANR features for UTRAN FDD": null,
                                "Inter-RAT ANR features for GERAN": null,
                                "Inter-RAT ANR features for 1xRTT": null,
                                "Inter-RAT ANR features for HRPD": null,
                                "Inter-RAT ANR features for UTRAN TDD": null,
                                "EUTRA RRC_CONNECTED to UTRA TDD CELL_DCH PS handover": null,
                                "UTRAN TDD measurements, reporting and measurement reporting event B2 in E-UTRA connected mode": null,
                                "EUTRA RRC_CONNECTED to UTRA TDD CELL_DCH CS handover": null,
                                "Measurement reporting event: Event B1 - Neighbour > threshold for UTRAN FDD": null,
                                "DCI format 3a": null
                              }
                            },
                            "nonCriticalExtension": {
                              "nonCriticalExtension": {
                                "nonCriticalExtension": {
                                  "nonCriticalExtension": {
                                    "nonCriticalExtension": {
                                      "otdoa-PositioningCapabilities-r10": {
                                        "otdoa-UE-Assisted-r10": null
                                      },
                                      "nonCriticalExtension": {
                                        "rf-Parameters-v10f0": {
                                          "modifiedMPR-Behavior-r10": {
                                            "MPR/A-MPR behavior 0": null,
                                            "MPR/A-MPR behavior 1": null,
                                            "MPR/A-MPR behavior 2": null,
                                            "MPR/A-MPR behavior 3": null,
                                            "MPR/A-MPR behavior 4": null,
                                            "MPR/A-MPR behavior 5": null,
                                            "MPR/A-MPR behavior 6": null,
                                            "MPR/A-MPR behavior 7": null,
                                            "MPR/A-MPR behavior 8": null,
                                            "MPR/A-MPR behavior 9": null,
                                            "MPR/A-MPR behavior 10": null,
                                            "MPR/A-MPR behavior 11": null,
                                            "MPR/A-MPR behavior 12": null,
                                            "MPR/A-MPR behavior 13": null,
                                            "MPR/A-MPR behavior 14": null,
                                            "MPR/A-MPR behavior 15": null,
                                            "MPR/A-MPR behavior 16": null,
                                            "MPR/A-MPR behavior 17": null,
                                            "MPR/A-MPR behavior 18": null,
                                            "MPR/A-MPR behavior 19": null,
                                            "MPR/A-MPR behavior 20": null,
                                            "MPR/A-MPR behavior 21": null,
                                            "MPR/A-MPR behavior 22": null,
                                            "MPR/A-MPR behavior 23": null,
                                            "MPR/A-MPR behavior 24": null,
                                            "MPR/A-MPR behavior 25": null,
                                            "MPR/A-MPR behavior 26": null,
                                            "MPR/A-MPR behavior 27": null,
                                            "MPR/A-MPR behavior 28": null,
                                            "MPR/A-MPR behavior 29": null,
                                            "MPR/A-MPR behavior 30": null,
                                            "MPR/A-MPR behavior 31": null
                                          }
                                        },
                                        "nonCriticalExtension": {
                                          "rf-Parameters-v10i0": {
                                            "supportedBandCombination-v10i0": {
                                              "[]": {
                                                "bandParameterList-v10i0": {
                                                  "[]": {
                                                    "bandParametersDL-v10i0": {
                                                      "[]": {
                                                        "fourLayerTM3-TM4-r10": null
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          "nonCriticalExtension": {
                                            "nonCriticalExtension": {
                                              "nonCriticalExtension": {
                                                "rf-Parameters-v12b0": {
                                                  "maxLayersMIMO-Indication-r12": null
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "nonCriticalExtension": {
                            "ue-Category-v1020": null,
                            "phyLayerParameters-v1020": {
                              "tm9-With-8Tx-FDD-r10": null,
                              "multiClusterPUSCH-WithinCC-r10": null,
                              "nonContiguousUL-RA-WithinCC-List-r10": {
                                "[]": {
                                  "nonContiguousUL-RA-WithinCC-Info-r10": null
                                }
                              }
                            },
                            "rf-Parameters-v1020": {
                              "supportedBandCombination-r10": {
                                "[]": {
                                  "[]": {
                                    "bandEUTRA-r10": null,
                                    "bandParametersUL-r10": {
                                      "[]": {
                                        "ca-BandwidthClassUL-r10": null
                                      }
                                    },
                                    "bandParametersDL-r10": {
                                      "[]": {
                                        "ca-BandwidthClassDL-r10": null,
                                        "supportedMIMO-CapabilityDL-r10": null
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "measParameters-v1020": {
                              "bandCombinationListEUTRA-r10": {
                                "[]": {
                                  "interFreqBandList": {
                                    "[]": {
                                      "interFreqNeedForGaps": null
                                    }
                                  },
                                  "interRAT-BandList": {
                                    "[]": {
                                      "interRAT-NeedForGaps": null
                                    }
                                  }
                                }
                              }
                            },
                            "featureGroupIndRel10-r10": {
                              "DMRS with OCC (orthogonal cover code) and SGH (sequence group hopping) disabling": null,
                              "Trigger type 1 SRS (aperiodic SRS) transmission (Up to X ports)": null,
                              "PDSCH TM9 when up to 4 CSI reference signal ports are configured": null,
                              "PDSCH TM9 for TDD when 8 CSI reference signal ports are configured": null,
                              "PUCCH RM2-0 when PDSCH TM9 is configured and RM2-1 when PDSCH TM9 and up to 4 CSI reference signal ports are configured": null,
                              "PUCCH RM2-1 when PDSCH TM9 and 8 CSI reference signal ports are configured": null,
                              "PUSCH RM2-0 when PDSCH TM9 is configured and RM2-2 when PDSCH TM9 and up to 4 CSI reference signal ports are configured": null,
                              "PUSCH RM2-2 when PDSCH TM9 and 8 CSI reference signal ports are configured": null,
                              "PUCCH RM1-1 submode 1": null,
                              "PUCCH RM1-1 submode 2": null,
                              "Measurement reporting trigger Event A6": null,
                              "SCell addition within the Handover to EUTRA procedure": null,
                              "Trigger type 0 SRS (periodic SRS) transmission on X Serving Cells": null,
                              "Reporting of both UTRA CPICH RSCP and Ec/N0 in a Measurement Report": null,
                              "Time domain ICIC RLM/RRM / ICIC RRM / ICIC CSI measurement sf restriction for the serving cell / neighbour cells": null,
                              "Relative transmit phase continuity for spatial multiplexing in UL": null
                            },
                            "nonCriticalExtension": {
                              "fdd-Add-UE-EUTRA-Capabilities-v1060": {
                                "phyLayerParameters-v1060": {
                                  "tm9-With-8Tx-FDD-r10": null
                                },
                                "featureGroupIndRel10-v1060": {
                                  "DMRS with OCC (orthogonal cover code) and SGH (sequence group hopping) disabling": null,
                                  "Trigger type 1 SRS (aperiodic SRS) transmission (Up to X ports)": null,
                                  "PDSCH TM9 when up to 4 CSI reference signal ports are configured": null,
                                  "PDSCH TM9 for TDD when 8 CSI reference signal ports are configured": null,
                                  "PUCCH RM2-0 when PDSCH TM9 is configured and RM2-1 when PDSCH TM9 and up to 4 CSI reference signal ports are configured": null,
                                  "PUCCH RM2-1 when PDSCH TM9 and 8 CSI reference signal ports are configured": null,
                                  "PUSCH RM2-0 when PDSCH TM9 is configured and RM2-2 when PDSCH TM9 and up to 4 CSI reference signal ports are configured": null,
                                  "PUSCH RM2-2 when PDSCH TM9 and 8 CSI reference signal ports are configured": null,
                                  "PUCCH RM1-1 submode 1": null,
                                  "PUCCH RM1-1 submode 2": null,
                                  "Measurement reporting trigger Event A6": null,
                                  "SCell addition within the Handover to EUTRA procedure": null,
                                  "Trigger type 0 SRS (periodic SRS) transmission on X Serving Cells": null,
                                  "Reporting of both UTRA CPICH RSCP and Ec/N0 in a Measurement Report": null,
                                  "Time domain ICIC RLM/RRM / ICIC RRM / ICIC CSI measurement sf restriction for the serving cell / neighbour cells": null,
                                  "Relative transmit phase continuity for spatial multiplexing in UL": null
                                }
                              },
                              "tdd-Add-UE-EUTRA-Capabilities-v1060": {
                                "featureGroupIndRel10-v1060": {
                                  "DMRS with OCC (orthogonal cover code) and SGH (sequence group hopping) disabling": null,
                                  "Trigger type 1 SRS (aperiodic SRS) transmission (Up to X ports)": null,
                                  "PDSCH TM9 when up to 4 CSI reference signal ports are configured": null,
                                  "PDSCH TM9 for TDD when 8 CSI reference signal ports are configured": null,
                                  "PUCCH RM2-0 when PDSCH TM9 is configured and RM2-1 when PDSCH TM9 and up to 4 CSI reference signal ports are configured": null,
                                  "PUCCH RM2-1 when PDSCH TM9 and 8 CSI reference signal ports are configured": null,
                                  "PUSCH RM2-0 when PDSCH TM9 is configured and RM2-2 when PDSCH TM9 and up to 4 CSI reference signal ports are configured": null,
                                  "PUSCH RM2-2 when PDSCH TM9 and 8 CSI reference signal ports are configured": null,
                                  "PUCCH RM1-1 submode 1": null,
                                  "PUCCH RM1-1 submode 2": null,
                                  "Measurement reporting trigger Event A6": null,
                                  "SCell addition within the Handover to EUTRA procedure": null,
                                  "Trigger type 0 SRS (periodic SRS) transmission on X Serving Cells": null,
                                  "Reporting of both UTRA CPICH RSCP and Ec/N0 in a Measurement Report": null,
                                  "Time domain ICIC RLM/RRM / ICIC RRM / ICIC CSI measurement sf restriction for the serving cell / neighbour cells": null,
                                  "Relative transmit phase continuity for spatial multiplexing in UL": null
                                }
                              },
                              "rf-Parameters-v1060": {
                                "supportedBandCombinationExt-r10": {
                                  "[]": {
                                    "supportedBandwidthCombinationSet-r10": null
                                  }
                                }
                              },
                              "nonCriticalExtension": {
                                "nonCriticalExtension": {
                                  "pdcp-Parameters-v1130": {
                                    "pdcp-SN-Extension-r11": null
                                  },
                                  "phyLayerParameters-v1130": {
                                    "multiACK-CSI-Reporting-r11": null,
                                    "ss-CCH-InterfHandl-r11": null,
                                    "tdd-SpecialSubframe-r11": null
                                  },
                                  "rf-Parameters-v1130": {},
                                  "measParameters-v1130": {},
                                  "interRAT-ParametersCDMA2000-v1130": {},
                                  "otherParameters-r11": {
                                    "ue-Rx-TxTimeDiffMeasurements-r11": null
                                  },
                                  "nonCriticalExtension": {
                                    "ue-Category-v1170": null,
                                    "nonCriticalExtension": {
                                      "rf-Parameters-v1180": {
                                        "freqBandRetrieval-r11": null,
                                        "requestedBands-r11": {
                                          "[]": null
                                        }
                                      },
                                      "mbms-Parameters-r11": {
                                        "mbms-SCell-r11": null
                                      },
                                      "nonCriticalExtension": {
                                        "ue-Category-v11a0": null,
                                        "nonCriticalExtension": {
                                          "phyLayerParameters-v1250": {
                                            "discoverySignalsInDeactSCell-r12": null
                                          },
                                          "rf-Parameters-v1250": {
                                            "supportedBandListEUTRA-v1250": {
                                              "[]": {
                                                "dl-256QAM-r12": null,
                                                "ul-64QAM-r12": null
                                              }
                                            },
                                            "freqBandPriorityAdjustment-r12": null
                                          },
                                          "ue-CategoryDL-r12": null,
                                          "ue-CategoryUL-r12": null,
                                          "measParameters-v1250": {
                                            "incMonEUTRA-r12": null,
                                            "extendedMaxMeasId-r12": null,
                                            "crs-DiscoverySignalsMeas-r12": null
                                          },
                                          "nonCriticalExtension": {
                                            "ue-CategoryDL-v1260": null,
                                            "nonCriticalExtension": {
                                              "nonCriticalExtension": {
                                                "phyLayerParameters-v1280": {
                                                  "alternativeTBS-Indices-r12": null
                                                },
                                                "nonCriticalExtension": {
                                                  "pdcp-Parameters-v1310": {},
                                                  "rlc-Parameters-v1310": {
                                                    "extendedRLC-SN-SO-Field-r13": null
                                                  },
                                                  "phyLayerParameters-v1310": {
                                                    "codebook-HARQ-ACK-r13": null
                                                  },
                                                  "rf-Parameters-v1310": {
                                                    "maximumCCsRetrieval-r13": null,
                                                    "skipFallbackCombinations-r13": null
                                                  },
                                                  "measParameters-v1310": {
                                                    "extendedMaxObjectId-r13": null
                                                  },
                                                  "interRAT-ParametersWLAN-r13": {},
                                                  "wlan-IW-Parameters-v1310": {},
                                                  "lwip-Parameters-r13": {},
                                                  "nonCriticalExtension": {
                                                    "nonCriticalExtension": {
                                                      "ue-CategoryDL-v1330": null,
                                                      "nonCriticalExtension": {
                                                        "nonCriticalExtension": {
                                                          "ce-Parameters-v1350": {},
                                                          "nonCriticalExtension": {
                                                            "nonCriticalExtension": {
                                                              "phyLayerParameters-v1430": {
                                                                "alternativeTBS-Index-r14": null
                                                              },
                                                              "rlc-Parameters-v1430": {
                                                                "extendedPollByte-r14": null
                                                              },
                                                              "otherParameters-v1430": {},
                                                              "ce-Parameters-v1430": {},
                                                              "nonCriticalExtension": {
                                                                "lwa-Parameters-v1440": {},
                                                                "mac-Parameters-v1440": {},
                                                                "nonCriticalExtension": {
                                                                  "otherParameters-v1450": {},
                                                                  "nonCriticalExtension": {
                                                                    "otherParameters-v1460": {},
                                                                    "nonCriticalExtension": {
                                                                      "irat-ParametersNR-r15": {
                                                                        "en-DC-r15": null,
                                                                        "eventB2-r15": null,
                                                                        "supportedBandListEN-DC-r15": {
                                                                          "[]": {
                                                                            "bandNR-r15": null
                                                                          }
                                                                        }
                                                                      },
                                                                      "pdcp-ParametersNR-r15": {
                                                                        "rohc-Profiles-r15": {
                                                                          "profile0x0001-r15": null,
                                                                          "profile0x0002-r15": null,
                                                                          "profile0x0003-r15": null,
                                                                          "profile0x0004-r15": null,
                                                                          "profile0x0006-r15": null,
                                                                          "profile0x0101-r15": null,
                                                                          "profile0x0102-r15": null,
                                                                          "profile0x0103-r15": null,
                                                                          "profile0x0104-r15": null
                                                                        },
                                                                        "rohc-ProfilesUL-Only-r15": {
                                                                          "profile0x0006-r15": null
                                                                        },
                                                                        "sn-SizeLo-r15": null
                                                                      },
                                                                      "nonCriticalExtension": {
                                                                        "measParameters-v1520": {},
                                                                        "nonCriticalExtension": {
                                                                          "neighCellSI-AcquisitionParameters-v1530": {
                                                                            "reportCGI-NR-NoEN-DC-r15": null
                                                                          },
                                                                          "extendedNumberOfDRBs-r15": null,
                                                                          "nonCriticalExtension": {
                                                                            "otherParameters-v1540": {},
                                                                            "irat-ParametersNR-v1540": {
                                                                              "eutra-EPC-HO-ToNR-FDD-FR1-r15": null,
                                                                              "eutra-EPC-HO-ToNR-TDD-FR1-r15": null,
                                                                              "ims-VoiceOverNR-FR1-r15": null,
                                                                              "sa-NR-r15": null,
                                                                              "supportedBandListNR-SA-r15": {
                                                                                "[]": {
                                                                                  "bandNR-r15": null
                                                                                }
                                                                              }
                                                                            },
                                                                            "nonCriticalExtension": {
                                                                              "phyLayerParameters-v1550": {},
                                                                              "mac-Parameters-v1550": {
                                                                                "eLCID-Support-r15": null
                                                                              },
                                                                              "fdd-Add-UE-EUTRA-Capabilities-v1550": {},
                                                                              "tdd-Add-UE-EUTRA-Capabilities-v1550": {}
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "phyLayerParameters-v920": {
                          "enhancedDualLayerTDD-r9": null
                        },
                        "interRAT-ParametersGERAN-v920": {},
                        "csg-ProximityIndicationParameters-r9": {},
                        "neighCellSI-AcquisitionParameters-r9": {
                          "intraFreqSI-AcquisitionForHO-r9": null,
                          "interFreqSI-AcquisitionForHO-r9": null
                        },
                        "son-Parameters-r9": {
                          "rach-Report-r9": null
                        }
                      },
                      "ue-Category": null,
                      "phyLayerParameters": {
                        "ue-TxAntennaSelectionSupported": null,
                        "ue-SpecificRefSigsSupported": null
                      },
                      "measParameters": {
                        "bandListEUTRA": {
                          "[]": {
                            "interFreqBandList": {
                              "[]": {
                                "interFreqNeedForGaps": null
                              }
                            },
                            "interRAT-BandList": {
                              "[]": {
                                "interRAT-NeedForGaps": null
                              }
                            }
                          }
                        }
                      },
                      "featureGroupIndicators": {
                        "Intra-subframe freq hopping for PUSCH scheduled by UL grant; DCI format 3a; Aperiodic CQI/PMI/RI report on PUSCH: Mode 2-0 & 2-2": null,
                        "Simultaneous CQI & ACK/NACK on PUCCH (format 2a/2b); Absolute TPC command for PUSCH; Resource alloc type 1 for PDSCH; Periodic CQI/PMI/RI report on PUCCH: Mode 2-0 & 2-1": null,
                        "5bit RLC UM SN; 7bit PDCP SN": null,
                        "Short DRX cycle": null,
                        "Long DRX cycle; DRX command MAC control element": null,
                        "Prioritised bit rate": null,
                        "RLC UM": null,
                        "EUTRA RRC_CONNECTED to UTRA CELL_DCH PS handover": null,
                        "EUTRA RRC_CONNECTED to GERAN GSM_Dedicated handover": null,
                        "EUTRA RRC_CONNECTED to GERAN (Packet) Idle by Cell Change Order; EUTRA RRC_CONNECTED to GERAN (Packet) Idle by Cell Change Order with NACC": null,
                        "EUTRA RRC_CONNECTED to CDMA2000 1xRTT CS Active handover": null,
                        "EUTRA RRC_CONNECTED to CDMA2000 HRPD Active handover": null,
                        "Inter-frequency handover (within FDD or TDD)": null,
                        "Measurement reporting event: Event A4 - Neighbour > threshold; Measurement reporting event: Event A5 - Serving < threshold1 & Neighbour > threshold2": null,
                        "Measurement reporting event: Event B1 - Neighbour > threshold": null,
                        "non-ANR related periodical measurement reporting": null,
                        "ANR related intra-frequency measurement reporting events": null,
                        "ANR related inter-frequency measurement reporting events": null,
                        "ANR related inter-RAT measurement reporting events": null,
                        "SRB1 and SRB2 for DCCH + 8x AM DRB; SRB1 and SRB2 for DCCH + 5x AM DRB + 3x UM DRB (if indicator 7 is supported)": null,
                        "Predefined intra- and inter-subframe frequency hopping for PUSCH with N_sb > 1; Predefined inter-subframe frequency hopping for PUSCH with N_sb > 1": null,
                        "UTRAN measurements, reporting and measurement reporting event B2 in E-UTRA connected mode": null,
                        "GERAN measurements, reporting and measurement reporting event B2 in E-UTRA connected mode": null,
                        "1xRTT measurements, reporting and measurement reporting event B2 in E-UTRA connected mode": null,
                        "Inter-frequency measurements and reporting in E-UTRA connected mode": null,
                        "HRPD measurements, reporting and measurement reporting event B2 in E-UTRA connected mode": null,
                        "EUTRA RRC_CONNECTED to UTRA CELL_DCH CS handover": null,
                        "TTI bundling": null,
                        "Semi-Persistent Scheduling": null,
                        "Handover between FDD and TDD": null,
                        "Mechanisms defined for cells broadcasting multi band information": null
                      },
                      "interRAT-Parameters": {
                        "cdma2000-HRPD": {
                          "supportedBandListHRPD": {
                            "[]": null
                          },
                          "tx-ConfigHRPD": null,
                          "rx-ConfigHRPD": null
                        },
                        "cdma2000-1xRTT": {
                          "supportedBandList1XRTT": {
                            "[]": null
                          },
                          "tx-Config1XRTT": null,
                          "rx-Config1XRTT": null
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "ulInformationTransfer": {
            "criticalExtensions": {
              "ulInformationTransfer": {
                "dedicatedNAS-Message": null
              }
            }
          }
        }
      },
      "dl-dcch": {
        "c1": {
          "rrcReconfiguration": {
            "rrc-TransactionIdentifier": null,
            "criticalExtensions": {
              "rrcReconfiguration": {
                "measConfig": {
                  "reportConfigToRemoveList": {
                    "[]": null
                  },
                  "reportConfigToAddModList": {
                    "[]": {
                      "reportConfigId": null,
                      "reportConfig": {
                        "reportConfigNR": {
                          "reportType": {
                            "eventTriggered": {
                              "eventId": {
                                "eventA2": {
                                  "a2-Threshold": {
                                    "rsrp": null
                                  },
                                  "reportOnLeave": null,
                                  "hysteresis": null,
                                  "timeToTrigger": null
                                },
                                "eventA3": {
                                  "a3-Offset": {
                                    "rsrp": null
                                  },
                                  "reportOnLeave": null,
                                  "hysteresis": null,
                                  "timeToTrigger": null,
                                  "useAllowedCellList": null
                                },
                                "eventA1": {
                                  "a1-Threshold": {
                                    "rsrp": null
                                  },
                                  "reportOnLeave": null,
                                  "hysteresis": null,
                                  "timeToTrigger": null
                                },
                                "eventA5": {
                                  "a5-Threshold1": {
                                    "rsrp": null
                                  },
                                  "a5-Threshold2": {
                                    "rsrp": null
                                  },
                                  "reportOnLeave": null,
                                  "hysteresis": null,
                                  "timeToTrigger": null,
                                  "useAllowedCellList": null
                                }
                              },
                              "rsType": null,
                              "reportInterval": null,
                              "reportAmount": null,
                              "reportQuantityCell": {
                                "rsrp": null,
                                "rsrq": null,
                                "sinr": null
                              },
                              "maxReportCells": null,
                              "reportQuantityRS-Indexes": {
                                "rsrp": null,
                                "rsrq": null,
                                "sinr": null
                              },
                              "maxNrofRS-IndexesToReport": null,
                              "includeBeamMeasurements": null,
                              "useT312-r16": null
                            },
                            "periodical": {
                              "rsType": null,
                              "reportInterval": null,
                              "reportAmount": null,
                              "reportQuantityCell": {
                                "rsrp": null,
                                "rsrq": null,
                                "sinr": null
                              },
                              "maxReportCells": null,
                              "reportQuantityRS-Indexes": {
                                "rsrp": null,
                                "rsrq": null,
                                "sinr": null
                              },
                              "maxNrofRS-IndexesToReport": null,
                              "includeBeamMeasurements": null,
                              "useAllowedCellList": null
                            }
                          }
                        },
                        "reportConfigInterRAT": {
                          "reportType": {
                            "eventTriggered": {
                              "eventId": {
                                "eventB2": {
                                  "b2-Threshold1": {
                                    "rsrp": null
                                  },
                                  "b2-Threshold2EUTRA": {
                                    "rsrp": null
                                  },
                                  "reportOnLeave": null,
                                  "hysteresis": null,
                                  "timeToTrigger": null
                                }
                              },
                              "rsType": null,
                              "reportInterval": null,
                              "reportAmount": null,
                              "reportQuantity": {
                                "rsrp": null,
                                "rsrq": null,
                                "sinr": null
                              },
                              "maxReportCells": null
                            }
                          }
                        }
                      }
                    }
                  },
                  "measIdToRemoveList": {
                    "[]": null
                  },
                  "measIdToAddModList": {
                    "[]": {
                      "measId": null,
                      "measObjectId": null,
                      "reportConfigId": null
                    }
                  },
                  "measObjectToAddModList": {
                    "[]": {
                      "measObjectId": null,
                      "measObject": {
                        "measObjectNR": {
                          "ssbFrequency": null,
                          "ssbSubcarrierSpacing": null,
                          "smtc1": {
                            "periodicityAndOffset": {
                              "sf20": null
                            },
                            "duration": null
                          },
                          "referenceSignalConfig": {
                            "ssb-ConfigMobility": {
                              "deriveSSB-IndexFromCell": null,
                              "ssb-ToMeasure": {
                                "setup": {
                                  "mediumBitmap": null
                                }
                              }
                            }
                          },
                          "absThreshSS-BlocksConsolidation": {
                            "thresholdRSRP": null
                          },
                          "nrofSS-BlocksToAverage": null,
                          "quantityConfigIndex": null,
                          "offsetMO": {},
                          "freqBandIndicatorNR": null
                        },
                        "measObjectEUTRA": {
                          "carrierFreq": null,
                          "allowedMeasBandwidth": null,
                          "eutra-PresenceAntennaPort1": null,
                          "widebandRSRQ-Meas": null
                        }
                      }
                    }
                  },
                  "quantityConfig": {
                    "quantityConfigNR-List": {
                      "[]": {
                        "quantityConfigCell": {
                          "ssb-FilterConfig": {},
                          "csi-RS-FilterConfig": {}
                        },
                        "quantityConfigRS-Index": {
                          "ssb-FilterConfig": {},
                          "csi-RS-FilterConfig": {}
                        }
                      }
                    },
                    "quantityConfigEUTRA": {}
                  },
                  "measObjectToRemoveList": {
                    "[]": null
                  },
                  "measGapConfig": {
                    "gapUE": {
                      "setup": {
                        "gapOffset": null,
                        "mgl": null,
                        "mgrp": null,
                        "mgta": null
                      },
                      "release": null
                    }
                  }
                },
                "radioBearerConfig": {
                  "srb-ToAddModList": {
                    "[]": {
                      "srb-Identity": null,
                      "pdcp-Config": {
                        "t-Reordering": null
                      },
                      "reestablishPDCP": null
                    }
                  },
                  "drb-ToAddModList": {
                    "[]": {
                      "cnAssociation": {
                        "sdap-Config": {
                          "pdu-Session": null,
                          "sdap-HeaderDL": null,
                          "sdap-HeaderUL": null,
                          "defaultDRB": null,
                          "mappedQoS-FlowsToAdd": {
                            "[]": null
                          }
                        }
                      },
                      "drb-Identity": null,
                      "pdcp-Config": {
                        "drb": {
                          "discardTimer": null,
                          "pdcp-SN-SizeUL": null,
                          "pdcp-SN-SizeDL": null,
                          "headerCompression": {
                            "notUsed": null
                          },
                          "statusReportRequired": null
                        },
                        "t-Reordering": null,
                        "cipheringDisabled": null
                      },
                      "reestablishPDCP": null,
                      "recoverPDCP": null
                    }
                  },
                  "securityConfig": {
                    "securityAlgorithmConfig": {
                      "cipheringAlgorithm": null,
                      "integrityProtAlgorithm": null
                    },
                    "keyToUse": null
                  }
                },
                "nonCriticalExtension": {
                  "masterCellGroup": {
                    "cellGroupId": null,
                    "rlc-BearerToAddModList": {
                      "[]": {
                        "logicalChannelIdentity": null,
                        "servedRadioBearer": {
                          "srb-Identity": null,
                          "drb-Identity": null
                        },
                        "rlc-Config": {
                          "am": {
                            "ul-AM-RLC": {
                              "sn-FieldLength": null,
                              "t-PollRetransmit": null,
                              "pollPDU": null,
                              "pollByte": null,
                              "maxRetxThreshold": null
                            },
                            "dl-AM-RLC": {
                              "sn-FieldLength": null,
                              "t-Reassembly": null,
                              "t-StatusProhibit": null
                            }
                          }
                        },
                        "mac-LogicalChannelConfig": {
                          "ul-SpecificParameters": {
                            "priority": null,
                            "prioritisedBitRate": null,
                            "bucketSizeDuration": null,
                            "logicalChannelGroup": null,
                            "schedulingRequestID": null,
                            "logicalChannelSR-Mask": null,
                            "logicalChannelSR-DelayTimerApplied": null
                          }
                        },
                        "reestablishRLC": null
                      }
                    },
                    "physicalCellGroupConfig": {
                      "p-NR-FR1": null,
                      "pdsch-HARQ-ACK-Codebook": null
                    },
                    "spCellConfig": {
                      "spCellConfigDedicated": {
                        "downlinkBWP-ToAddModList": {
                          "[]": {
                            "bwp-Id": null,
                            "bwp-Common": {
                              "genericParameters": {
                                "locationAndBandwidth": null,
                                "subcarrierSpacing": null
                              },
                              "pdcch-ConfigCommon": {
                                "setup": {
                                  "commonSearchSpaceList": {
                                    "[]": {
                                      "searchSpaceId": null,
                                      "controlResourceSetId": null,
                                      "monitoringSlotPeriodicityAndOffset": {
                                        "sl1": null
                                      },
                                      "monitoringSymbolsWithinSlot": null,
                                      "nrofCandidates": {
                                        "aggregationLevel1": null,
                                        "aggregationLevel2": null,
                                        "aggregationLevel4": null,
                                        "aggregationLevel8": null,
                                        "aggregationLevel16": null
                                      },
                                      "searchSpaceType": {
                                        "common": {
                                          "dci-Format0-0-AndFormat1-0": {}
                                        }
                                      }
                                    }
                                  },
                                  "searchSpaceSIB1": null,
                                  "searchSpaceOtherSystemInformation": null,
                                  "pagingSearchSpace": null,
                                  "ra-SearchSpace": null
                                }
                              },
                              "pdsch-ConfigCommon": {
                                "setup": {
                                  "pdsch-TimeDomainAllocationList": {
                                    "[]": {
                                      "k0": null,
                                      "mappingType": null,
                                      "startSymbolAndLength": null
                                    }
                                  }
                                }
                              }
                            },
                            "bwp-Dedicated": {
                              "pdcch-Config": {
                                "setup": {
                                  "controlResourceSetToAddModList": {
                                    "[]": {
                                      "controlResourceSetId": null,
                                      "frequencyDomainResources": null,
                                      "duration": null,
                                      "cce-REG-MappingType": {
                                        "nonInterleaved": null,
                                        "interleaved": {
                                          "reg-BundleSize": null,
                                          "interleaverSize": null,
                                          "shiftIndex": null
                                        }
                                      },
                                      "precoderGranularity": null,
                                      "tci-StatesPDCCH-ToAddList": {
                                        "[]": null
                                      },
                                      "pdcch-DMRS-ScramblingID": null
                                    }
                                  },
                                  "searchSpacesToAddModList": {
                                    "[]": {
                                      "searchSpaceId": null,
                                      "controlResourceSetId": null,
                                      "monitoringSlotPeriodicityAndOffset": {
                                        "sl1": null
                                      },
                                      "monitoringSymbolsWithinSlot": null,
                                      "nrofCandidates": {
                                        "aggregationLevel1": null,
                                        "aggregationLevel2": null,
                                        "aggregationLevel4": null,
                                        "aggregationLevel8": null,
                                        "aggregationLevel16": null
                                      },
                                      "searchSpaceType": {
                                        "common": {
                                          "dci-Format0-0-AndFormat1-0": {}
                                        },
                                        "ue-Specific": {
                                          "dci-Formats": null
                                        }
                                      }
                                    }
                                  },
                                  "controlResourceSetToReleaseList": {
                                    "[]": null
                                  }
                                }
                              },
                              "pdsch-Config": {
                                "setup": {
                                  "dmrs-DownlinkForPDSCH-MappingTypeA": {
                                    "setup": {
                                      "dmrs-AdditionalPosition": null,
                                      "scramblingID0": null,
                                      "scramblingID1": null,
                                      "dmrs-Type": null
                                    }
                                  },
                                  "tci-StatesToAddModList": {
                                    "[]": {
                                      "tci-StateId": null,
                                      "qcl-Type1": {
                                        "bwp-Id": null,
                                        "referenceSignal": {
                                          "csi-rs": null
                                        },
                                        "qcl-Type": null
                                      }
                                    }
                                  },
                                  "resourceAllocation": null,
                                  "pdsch-TimeDomainAllocationList": {
                                    "setup": {
                                      "[]": {
                                        "k0": null,
                                        "mappingType": null,
                                        "startSymbolAndLength": null
                                      }
                                    }
                                  },
                                  "rbg-Size": null,
                                  "mcs-Table": null,
                                  "maxNrofCodeWordsScheduledByDCI": null,
                                  "prb-BundlingType": {
                                    "staticBundling": {
                                      "bundleSize": null
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "firstActiveDownlinkBWP-Id": null,
                        "uplinkConfig": {
                          "initialUplinkBWP": {
                            "pucch-Config": {
                              "release": null
                            },
                            "pusch-Config": {
                              "release": null
                            }
                          },
                          "uplinkBWP-ToAddModList": {
                            "[]": {
                              "bwp-Id": null,
                              "bwp-Common": {
                                "genericParameters": {
                                  "locationAndBandwidth": null,
                                  "subcarrierSpacing": null
                                },
                                "rach-ConfigCommon": {
                                  "setup": {
                                    "rach-ConfigGeneric": {
                                      "prach-ConfigurationIndex": null,
                                      "msg1-FDM": null,
                                      "msg1-FrequencyStart": null,
                                      "zeroCorrelationZoneConfig": null,
                                      "preambleReceivedTargetPower": null,
                                      "preambleTransMax": null,
                                      "powerRampingStep": null,
                                      "ra-ResponseWindow": null
                                    },
                                    "totalNumberOfRA-Preambles": null,
                                    "ssb-perRACH-OccasionAndCB-PreamblesPerSSB": {
                                      "one": null,
                                      "eight": null
                                    },
                                    "groupBconfigured": {
                                      "ra-Msg3SizeGroupA": null,
                                      "messagePowerOffsetGroupB": null,
                                      "numberOfRA-PreamblesGroupA": null
                                    },
                                    "ra-ContentionResolutionTimer": null,
                                    "rsrp-ThresholdSSB": null,
                                    "prach-RootSequenceIndex": {
                                      "l839": null
                                    },
                                    "restrictedSetConfig": null
                                  }
                                },
                                "pusch-ConfigCommon": {
                                  "setup": {
                                    "pusch-TimeDomainAllocationList": {
                                      "[]": {
                                        "k2": null,
                                        "mappingType": null,
                                        "startSymbolAndLength": null
                                      }
                                    },
                                    "msg3-DeltaPreamble": null,
                                    "p0-NominalWithGrant": null
                                  }
                                },
                                "pucch-ConfigCommon": {
                                  "setup": {
                                    "pucch-GroupHopping": null,
                                    "hoppingId": null,
                                    "p0-nominal": null
                                  }
                                }
                              },
                              "bwp-Dedicated": {
                                "pucch-Config": {
                                  "setup": {
                                    "resourceSetToAddModList": {
                                      "[]": {
                                        "pucch-ResourceSetId": null,
                                        "resourceList": {
                                          "[]": null
                                        },
                                        "maxPayloadSize": null
                                      }
                                    },
                                    "resourceToAddModList": {
                                      "[]": {
                                        "pucch-ResourceId": null,
                                        "startingPRB": null,
                                        "format": {
                                          "format1": {
                                            "initialCyclicShift": null,
                                            "nrofSymbols": null,
                                            "startingSymbolIndex": null,
                                            "timeDomainOCC": null
                                          },
                                          "format3": {
                                            "nrofPRBs": null,
                                            "nrofSymbols": null,
                                            "startingSymbolIndex": null
                                          }
                                        }
                                      }
                                    },
                                    "format1": {
                                      "setup": {}
                                    },
                                    "format2": {
                                      "setup": {
                                        "maxCodeRate": null,
                                        "simultaneousHARQ-ACK-CSI": null
                                      }
                                    },
                                    "format3": {
                                      "setup": {
                                        "maxCodeRate": null,
                                        "simultaneousHARQ-ACK-CSI": null
                                      }
                                    },
                                    "schedulingRequestResourceToAddModList": {
                                      "[]": {
                                        "schedulingRequestResourceId": null,
                                        "schedulingRequestID": null,
                                        "periodicityAndOffset": {
                                          "sl10": null
                                        },
                                        "resource": null
                                      }
                                    },
                                    "dl-DataToUL-ACK": {
                                      "[]": null
                                    },
                                    "pucch-PowerControl": {
                                      "deltaF-PUCCH-f0": null,
                                      "deltaF-PUCCH-f1": null,
                                      "deltaF-PUCCH-f2": null,
                                      "deltaF-PUCCH-f3": null,
                                      "deltaF-PUCCH-f4": null,
                                      "p0-Set": {
                                        "[]": {
                                          "p0-PUCCH-Id": null,
                                          "p0-PUCCH-Value": null
                                        }
                                      },
                                      "pathlossReferenceRSs": {
                                        "[]": {
                                          "pucch-PathlossReferenceRS-Id": null,
                                          "referenceSignal": {
                                            "csi-RS-Index": null
                                          }
                                        }
                                      }
                                    },
                                    "format4": {
                                      "setup": {
                                        "maxCodeRate": null,
                                        "simultaneousHARQ-ACK-CSI": null
                                      }
                                    },
                                    "multi-CSI-PUCCH-ResourceList": {
                                      "[]": null
                                    },
                                    "resourceToReleaseList": {
                                      "[]": null
                                    }
                                  }
                                },
                                "pusch-Config": {
                                  "setup": {
                                    "txConfig": null,
                                    "dmrs-UplinkForPUSCH-MappingTypeA": {
                                      "setup": {
                                        "dmrs-AdditionalPosition": null,
                                        "transformPrecodingDisabled": {
                                          "scramblingID0": null,
                                          "scramblingID1": null
                                        },
                                        "transformPrecodingEnabled": {},
                                        "maxLength": null
                                      }
                                    },
                                    "pusch-PowerControl": {
                                      "msg3-Alpha": null,
                                      "p0-NominalWithoutGrant": null,
                                      "p0-AlphaSets": {
                                        "[]": {
                                          "p0-PUSCH-AlphaSetId": null,
                                          "p0": null,
                                          "alpha": null
                                        }
                                      },
                                      "pathlossReferenceRSToAddModList": {
                                        "[]": {
                                          "pusch-PathlossReferenceRS-Id": null,
                                          "referenceSignal": {
                                            "csi-RS-Index": null
                                          }
                                        }
                                      }
                                    },
                                    "resourceAllocation": null,
                                    "pusch-TimeDomainAllocationList": {
                                      "setup": {
                                        "[]": {
                                          "k2": null,
                                          "mappingType": null,
                                          "startSymbolAndLength": null
                                        }
                                      }
                                    },
                                    "mcs-Table": null,
                                    "mcs-TableTransformPrecoder": null,
                                    "transformPrecoder": null,
                                    "codebookSubset": null,
                                    "maxRank": null,
                                    "uci-OnPUSCH": {
                                      "setup": {
                                        "betaOffsets": {
                                          "semiStatic": {
                                            "betaOffsetACK-Index1": null,
                                            "betaOffsetACK-Index2": null,
                                            "betaOffsetACK-Index3": null,
                                            "betaOffsetCSI-Part1-Index1": null,
                                            "betaOffsetCSI-Part1-Index2": null,
                                            "betaOffsetCSI-Part2-Index1": null,
                                            "betaOffsetCSI-Part2-Index2": null
                                          }
                                        },
                                        "scaling": null
                                      }
                                    }
                                  }
                                },
                                "srs-Config": {
                                  "setup": {
                                    "srs-ResourceSetToAddModList": {
                                      "[]": {
                                        "srs-ResourceSetId": null,
                                        "srs-ResourceIdList": {
                                          "[]": null
                                        },
                                        "resourceType": {
                                          "periodic": {},
                                          "aperiodic": {
                                            "aperiodicSRS-ResourceTrigger": null,
                                            "slotOffset": null
                                          }
                                        },
                                        "usage": null,
                                        "alpha": null,
                                        "p0": null,
                                        "pathlossReferenceRS": {
                                          "csi-RS-Index": null
                                        }
                                      }
                                    },
                                    "srs-ResourceToAddModList": {
                                      "[]": {
                                        "srs-ResourceId": null,
                                        "nrofSRS-Ports": null,
                                        "transmissionComb": {
                                          "n4": {
                                            "combOffset-n4": null,
                                            "cyclicShift-n4": null
                                          }
                                        },
                                        "resourceMapping": {
                                          "startPosition": null,
                                          "nrofSymbols": null,
                                          "repetitionFactor": null
                                        },
                                        "freqDomainPosition": null,
                                        "freqDomainShift": null,
                                        "freqHopping": {
                                          "c-SRS": null,
                                          "b-SRS": null,
                                          "b-hop": null
                                        },
                                        "groupOrSequenceHopping": null,
                                        "resourceType": {
                                          "periodic": {
                                            "periodicityAndOffset-p": {
                                              "sl80": null,
                                              "sl160": null,
                                              "sl40": null
                                            }
                                          },
                                          "aperiodic": {}
                                        },
                                        "sequenceId": null
                                      }
                                    },
                                    "tpc-Accumulation": null,
                                    "srs-ResourceToReleaseList": {
                                      "[]": null
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "firstActiveUplinkBWP-Id": null,
                          "pusch-ServingCellConfig": {
                            "setup": {
                              "maxMIMO-Layers": null
                            }
                          }
                        },
                        "pdsch-ServingCellConfig": {
                          "setup": {
                            "nrofHARQ-ProcessesForPDSCH": null,
                            "maxMIMO-Layers": null
                          }
                        },
                        "csi-MeasConfig": {
                          "setup": {
                            "nzp-CSI-RS-ResourceToAddModList": {
                              "[]": {
                                "nzp-CSI-RS-ResourceId": null,
                                "resourceMapping": {
                                  "frequencyDomainAllocation": {
                                    "row4": null,
                                    "row1": null,
                                    "other": null
                                  },
                                  "nrofPorts": null,
                                  "firstOFDMSymbolInTimeDomain": null,
                                  "cdm-Type": null,
                                  "density": {
                                    "one": null,
                                    "three": null
                                  },
                                  "freqBand": {
                                    "startingRB": null,
                                    "nrofRBs": null
                                  }
                                },
                                "powerControlOffset": null,
                                "powerControlOffsetSS": null,
                                "scramblingID": null,
                                "periodicityAndOffset": {
                                  "slots40": null
                                }
                              }
                            },
                            "nzp-CSI-RS-ResourceSetToAddModList": {
                              "[]": {
                                "nzp-CSI-ResourceSetId": null,
                                "nzp-CSI-RS-Resources": {
                                  "[]": null
                                },
                                "trs-Info": null
                              }
                            },
                            "csi-IM-ResourceToAddModList": {
                              "[]": {
                                "csi-IM-ResourceId": null,
                                "csi-IM-ResourceElementPattern": {
                                  "pattern1": {
                                    "subcarrierLocation-p1": null,
                                    "symbolLocation-p1": null
                                  }
                                },
                                "freqBand": {
                                  "startingRB": null,
                                  "nrofRBs": null
                                },
                                "periodicityAndOffset": {
                                  "slots40": null
                                }
                              }
                            },
                            "csi-IM-ResourceSetToAddModList": {
                              "[]": {
                                "csi-IM-ResourceSetId": null,
                                "csi-IM-Resources": {
                                  "[]": null
                                }
                              }
                            },
                            "csi-ResourceConfigToAddModList": {
                              "[]": {
                                "csi-ResourceConfigId": null,
                                "csi-RS-ResourceSetList": {
                                  "nzp-CSI-RS-SSB": {
                                    "nzp-CSI-RS-ResourceSetList": {
                                      "[]": null
                                    },
                                    "csi-SSB-ResourceSetList": {
                                      "[]": null
                                    }
                                  },
                                  "csi-IM-ResourceSetList": {
                                    "[]": null
                                  }
                                },
                                "bwp-Id": null,
                                "resourceType": null
                              }
                            },
                            "csi-ReportConfigToAddModList": {
                              "[]": {
                                "reportConfigId": null,
                                "resourcesForChannelMeasurement": null,
                                "csi-IM-ResourcesForInterference": null,
                                "reportConfigType": {
                                  "periodic": {
                                    "reportSlotConfig": {
                                      "slots160": null,
                                      "slots40": null
                                    },
                                    "pucch-CSI-ResourceList": {
                                      "[]": {
                                        "uplinkBandwidthPartId": null,
                                        "pucch-Resource": null
                                      }
                                    }
                                  }
                                },
                                "reportQuantity": {
                                  "cri-RI-PMI-CQI": null,
                                  "ssb-Index-RSRP": null
                                },
                                "reportFreqConfiguration": {
                                  "cqi-FormatIndicator": null,
                                  "pmi-FormatIndicator": null,
                                  "csi-ReportingBand": {
                                    "subbands14": null,
                                    "subbands18": null,
                                    "subbands13": null
                                  }
                                },
                                "timeRestrictionForChannelMeasurements": null,
                                "timeRestrictionForInterferenceMeasurements": null,
                                "codebookConfig": {
                                  "codebookType": {
                                    "type1": {
                                      "subType": {
                                        "typeI-SinglePanel": {
                                          "nrOfAntennaPorts": {
                                            "moreThanTwo": {
                                              "n1-n2": {
                                                "two-one-TypeI-SinglePanel-Restriction": null,
                                                "four-one-TypeI-SinglePanel-Restriction": null
                                              }
                                            }
                                          },
                                          "typeI-SinglePanel-ri-Restriction": null
                                        }
                                      },
                                      "codebookMode": null
                                    }
                                  }
                                },
                                "dummy": null,
                                "groupBasedBeamReporting": {
                                  "disabled": {
                                    "nrofReportedRS": null
                                  }
                                },
                                "cqi-Table": null,
                                "subbandSize": null
                              }
                            },
                            "reportTriggerSize": null,
                            "nzp-CSI-RS-ResourceToReleaseList": {
                              "[]": null
                            },
                            "csi-SSB-ResourceSetToAddModList": {
                              "[]": {
                                "csi-SSB-ResourceSetId": null,
                                "csi-SSB-ResourceList": {
                                  "[]": null
                                }
                              }
                            },
                            "csi-IM-ResourceToReleaseList": {
                              "[]": null
                            }
                          }
                        },
                        "tag-Id": null,
                        "servingCellMO": null
                      },
                      "reconfigurationWithSync": {
                        "spCellConfigCommon": {
                          "physCellId": null,
                          "downlinkConfigCommon": {
                            "frequencyInfoDL": {
                              "absoluteFrequencySSB": null,
                              "frequencyBandList": {
                                "[]": null
                              },
                              "absoluteFrequencyPointA": null,
                              "scs-SpecificCarrierList": {
                                "[]": {
                                  "offsetToCarrier": null,
                                  "subcarrierSpacing": null,
                                  "carrierBandwidth": null
                                }
                              }
                            },
                            "initialDownlinkBWP": {
                              "genericParameters": {
                                "locationAndBandwidth": null,
                                "subcarrierSpacing": null
                              },
                              "pdcch-ConfigCommon": {
                                "setup": {
                                  "controlResourceSetZero": null,
                                  "searchSpaceZero": null,
                                  "commonSearchSpaceList": {
                                    "[]": {
                                      "searchSpaceId": null,
                                      "controlResourceSetId": null,
                                      "monitoringSlotPeriodicityAndOffset": {
                                        "sl1": null
                                      },
                                      "monitoringSymbolsWithinSlot": null,
                                      "nrofCandidates": {
                                        "aggregationLevel1": null,
                                        "aggregationLevel2": null,
                                        "aggregationLevel4": null,
                                        "aggregationLevel8": null,
                                        "aggregationLevel16": null
                                      },
                                      "searchSpaceType": {
                                        "common": {
                                          "dci-Format0-0-AndFormat1-0": {}
                                        }
                                      }
                                    }
                                  },
                                  "searchSpaceSIB1": null,
                                  "searchSpaceOtherSystemInformation": null,
                                  "pagingSearchSpace": null,
                                  "ra-SearchSpace": null
                                }
                              },
                              "pdsch-ConfigCommon": {
                                "setup": {
                                  "pdsch-TimeDomainAllocationList": {
                                    "[]": {
                                      "k0": null,
                                      "mappingType": null,
                                      "startSymbolAndLength": null
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "uplinkConfigCommon": {
                            "frequencyInfoUL": {
                              "frequencyBandList": {
                                "[]": null
                              },
                              "absoluteFrequencyPointA": null,
                              "scs-SpecificCarrierList": {
                                "[]": {
                                  "offsetToCarrier": null,
                                  "subcarrierSpacing": null,
                                  "carrierBandwidth": null
                                }
                              },
                              "p-Max": null
                            },
                            "initialUplinkBWP": {
                              "genericParameters": {
                                "locationAndBandwidth": null,
                                "subcarrierSpacing": null
                              },
                              "rach-ConfigCommon": {
                                "setup": {
                                  "rach-ConfigGeneric": {
                                    "prach-ConfigurationIndex": null,
                                    "msg1-FDM": null,
                                    "msg1-FrequencyStart": null,
                                    "zeroCorrelationZoneConfig": null,
                                    "preambleReceivedTargetPower": null,
                                    "preambleTransMax": null,
                                    "powerRampingStep": null,
                                    "ra-ResponseWindow": null
                                  },
                                  "totalNumberOfRA-Preambles": null,
                                  "ssb-perRACH-OccasionAndCB-PreamblesPerSSB": {
                                    "one": null,
                                    "eight": null
                                  },
                                  "groupBconfigured": {
                                    "ra-Msg3SizeGroupA": null,
                                    "messagePowerOffsetGroupB": null,
                                    "numberOfRA-PreamblesGroupA": null
                                  },
                                  "ra-ContentionResolutionTimer": null,
                                  "prach-RootSequenceIndex": {
                                    "l839": null
                                  },
                                  "restrictedSetConfig": null,
                                  "rsrp-ThresholdSSB": null
                                }
                              },
                              "pusch-ConfigCommon": {
                                "setup": {
                                  "pusch-TimeDomainAllocationList": {
                                    "[]": {
                                      "k2": null,
                                      "mappingType": null,
                                      "startSymbolAndLength": null
                                    }
                                  },
                                  "msg3-DeltaPreamble": null,
                                  "p0-NominalWithGrant": null
                                }
                              },
                              "pucch-ConfigCommon": {
                                "setup": {
                                  "pucch-ResourceCommon": null,
                                  "pucch-GroupHopping": null,
                                  "hoppingId": null,
                                  "p0-nominal": null,
                                  "pucch-ResourceCommonRedCap-r17": null
                                }
                              }
                            },
                            "dummy": null
                          },
                          "n-TimingAdvanceOffset": null,
                          "ssb-PositionsInBurst": {
                            "shortBitmap": null,
                            "mediumBitmap": null
                          },
                          "ssb-periodicityServingCell": null,
                          "dmrs-TypeA-Position": null,
                          "ssbSubcarrierSpacing": null,
                          "ss-PBCH-BlockPower": null,
                          "tdd-UL-DL-ConfigurationCommon": {
                            "referenceSubcarrierSpacing": null,
                            "pattern1": {
                              "dl-UL-TransmissionPeriodicity": null,
                              "nrofDownlinkSlots": null,
                              "nrofDownlinkSymbols": null,
                              "nrofUplinkSlots": null,
                              "nrofUplinkSymbols": null
                            },
                            "pattern2": {
                              "dl-UL-TransmissionPeriodicity": null,
                              "nrofDownlinkSlots": null,
                              "nrofDownlinkSymbols": null,
                              "nrofUplinkSlots": null,
                              "nrofUplinkSymbols": null
                            }
                          }
                        },
                        "newUE-Identity": null,
                        "t304": null,
                        "rach-ConfigDedicated": {
                          "uplink": {
                            "cfra": {
                              "resources": {
                                "ssb": {
                                  "ssb-ResourceList": {
                                    "[]": {
                                      "ssb": null,
                                      "ra-PreambleIndex": null
                                    }
                                  },
                                  "ra-ssb-OccasionMaskIndex": null
                                }
                              }
                            }
                          }
                        }
                      },
                      "rlf-TimersAndConstants": {
                        "setup": {
                          "t310": null,
                          "n310": null,
                          "n311": null,
                          "t311": null
                        }
                      }
                    },
                    "mac-CellGroupConfig": {
                      "drx-Config": {
                        "setup": {
                          "drx-onDurationTimer": {
                            "milliSeconds": null
                          },
                          "drx-InactivityTimer": null,
                          "drx-HARQ-RTT-TimerDL": null,
                          "drx-HARQ-RTT-TimerUL": null,
                          "drx-RetransmissionTimerDL": null,
                          "drx-RetransmissionTimerUL": null,
                          "drx-LongCycleStartOffset": {
                            "ms80": null
                          },
                          "drx-SlotOffset": null
                        },
                        "release": null
                      },
                      "skipUplinkTxDynamic": null,
                      "schedulingRequestConfig": {
                        "schedulingRequestToAddModList": {
                          "[]": {
                            "schedulingRequestId": null,
                            "sr-ProhibitTimer": null,
                            "sr-TransMax": null
                          }
                        }
                      },
                      "bsr-Config": {
                        "periodicBSR-Timer": null,
                        "retxBSR-Timer": null
                      },
                      "tag-Config": {
                        "tag-ToAddModList": {
                          "[]": {
                            "tag-Id": null,
                            "timeAlignmentTimer": null
                          }
                        }
                      },
                      "phr-Config": {
                        "setup": {
                          "phr-PeriodicTimer": null,
                          "phr-ProhibitTimer": null,
                          "phr-Tx-PowerFactorChange": null,
                          "multiplePHR": null,
                          "dummy": null,
                          "phr-Type2OtherCell": null,
                          "phr-ModeOtherCG": null
                        }
                      }
                    }
                  },
                  "dedicatedNAS-MessageList": {},
                  "masterKeyUpdate": {
                    "keySetChangeIndicator": null,
                    "nextHopChainingCount": null
                  },
                  "fullConfig": null
                }
              }
            }
          },
          "rrcRelease": {
            "rrc-TransactionIdentifier": null,
            "criticalExtensions": {
              "rrcRelease": {
                "cellReselectionPriorities": {
                  "freqPriorityListEUTRA": {
                    "[]": {
                      "carrierFreq": null,
                      "cellReselectionPriority": null
                    }
                  },
                  "freqPriorityListNR": {
                    "[]": {
                      "carrierFreq": null,
                      "cellReselectionPriority": null,
                      "cellReselectionSubPriority": null
                    }
                  },
                  "t320": null
                },
                "redirectedCarrierInfo": {
                  "eutra": {
                    "eutraFrequency": null
                  }
                }
              }
            }
          },
          "securityModeCommand": {
            "rrc-TransactionIdentifier": null,
            "criticalExtensions": {
              "securityModeCommand": {
                "securityConfigSMC": {
                  "securityAlgorithmConfig": {
                    "cipheringAlgorithm": null,
                    "integrityProtAlgorithm": null
                  }
                }
              }
            }
          },
          "ueCapabilityEnquiry": {
            "rrc-TransactionIdentifier": null,
            "criticalExtensions": {
              "ueCapabilityEnquiry": {
                "ue-CapabilityRAT-RequestList": {
                  "[]": {
                    "rat-Type": null,
                    "capabilityRequestFilter": {
                      "frequencyBandListFilter": {
                        "[]": {
                          "bandInformationNR": {
                            "bandNR": null
                          }
                        }
                      },
                      "nonCriticalExtension": {
                        "srs-SwitchingTimeRequest": null
                      },
                      "rrc-TransactionIdentifier": null,
                      "criticalExtensions": {
                        "c1": {
                          "ueCapabilityEnquiry-r8": {
                            "ue-CapabilityRequest": {
                              "[]": null
                            },
                            "nonCriticalExtension": {
                              "nonCriticalExtension": {
                                "requestedFrequencyBands-r11": {
                                  "[]": null
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "ue-CapabilityEnquiryExt": {
                  "capabilityRequestFilterCommon": {
                    "uplinkTxSwitchRequest-r16": null
                  }
                }
              }
            }
          },
          "dlInformationTransfer": {
            "rrc-TransactionIdentifier": null,
            "criticalExtensions": {
              "dlInformationTransfer": {
                "dedicatedNAS-Message": null
              }
            }
          }
        }
      },
      "pcch": {
        "c1": {
          "paging": {
            "pagingRecordList": {
              "[]": {
                "ue-Identity": {
                  "ng-5G-S-TMSI": null
                }
              }
            }
          }
        }
      },
      "bcch-bch": {
        "mib": {
          "systemFrameNumber": null,
          "subCarrierSpacingCommon": null,
          "ssb-SubcarrierOffset": null,
          "dmrs-TypeA-Position": null,
          "pdcch-ConfigSIB1": {
            "controlResourceSetZero": null,
            "searchSpaceZero": null
          },
          "cellBarred": null,
          "intraFreqReselection": null,
          "spare": null
        }
      },
      "sib2": {
        "cellReselectionInfoCommon": {
          "nrofSS-BlocksToAverage": null,
          "absThreshSS-BlocksConsolidation": {
            "thresholdRSRP": null,
            "thresholdRSRQ": null,
            "thresholdSINR": null
          },
          "q-Hyst": null
        },
        "cellReselectionServingFreqInfo": {
          "s-NonIntraSearchP": null,
          "s-NonIntraSearchQ": null,
          "threshServingLowP": null,
          "cellReselectionPriority": null,
          "cellReselectionSubPriority": null
        },
        "intraFreqCellReselectionInfo": {
          "q-RxLevMin": null,
          "q-QualMin": null,
          "s-IntraSearchP": null,
          "t-ReselectionNR": null,
          "p-Max": null,
          "smtc": {
            "periodicityAndOffset": {
              "sf20": null
            },
            "duration": null
          },
          "deriveSSB-IndexFromCell": null,
          "ssb-ToMeasure": {
            "mediumBitmap": null
          }
        }
      },
      "sib3": {
        "intraFreqNeighCellList": {
          "[]": {
            "physCellId": null,
            "q-OffsetCell": null
          }
        },
        "intraFreqExcludedCellList": {
          "[]": {
            "start": null
          }
        }
      },
      "sib4": {
        "interFreqCarrierFreqList": {
          "[]": {
            "dl-CarrierFreq": null,
            "frequencyBandList": {
              "[]": {
                "freqBandIndicatorNR": null
              }
            },
            "nrofSS-BlocksToAverage": null,
            "absThreshSS-BlocksConsolidation": {
              "thresholdRSRP": null,
              "thresholdRSRQ": null,
              "thresholdSINR": null
            },
            "smtc": {
              "periodicityAndOffset": {
                "sf20": null
              },
              "duration": null
            },
            "ssbSubcarrierSpacing": null,
            "ssb-ToMeasure": {
              "mediumBitmap": null
            },
            "deriveSSB-IndexFromCell": null,
            "q-RxLevMin": null,
            "q-QualMin": null,
            "p-Max": null,
            "t-ReselectionNR": null,
            "threshX-HighP": null,
            "threshX-LowP": null,
            "threshX-Q": {
              "threshX-HighQ": null,
              "threshX-LowQ": null
            },
            "cellReselectionPriority": null,
            "cellReselectionSubPriority": null,
            "interFreqNeighCellList": {
              "[]": {
                "physCellId": null,
                "q-OffsetCell": null
              }
            },
            "interFreqExcludedCellList": {
              "[]": {
                "start": null
              }
            }
          }
        },
        "interFreqCarrierFreqList-v1700": {
          "[]": {
            "redCapAccessAllowed-r17": null
          }
        }
      },
      "sib5": {
        "carrierFreqListEUTRA": {
          "[]": {
            "carrierFreq": null,
            "allowedMeasBandwidth": null,
            "presenceAntennaPort1": null,
            "cellReselectionPriority": null,
            "threshX-High": null,
            "threshX-Low": null,
            "q-RxLevMin": null,
            "q-QualMin": null,
            "p-MaxEUTRA": null,
            "threshX-Q": {
              "threshX-HighQ": null,
              "threshX-LowQ": null
            },
            "eutra-ExcludedCellList": {
              "[]": {
                "start": null
              }
            }
          }
        },
        "t-ReselectionEUTRA": null
      },
      "ul-ccch": {
        "c1": {
          "rrcSetupRequest": {
            "rrcSetupRequest": {
              "ue-Identity": {
                "ng-5G-S-TMSI-Part1": null
              },
              "establishmentCause": null,
              "spare": null
            }
          }
        }
      },
      "dl-ccch": {
        "c1": {
          "rrcSetup": {
            "rrc-TransactionIdentifier": null,
            "criticalExtensions": {
              "rrcSetup": {
                "radioBearerConfig": {
                  "srb-ToAddModList": {
                    "[]": {
                      "srb-Identity": null,
                      "pdcp-Config": {
                        "t-Reordering": null
                      }
                    }
                  }
                },
                "masterCellGroup": {
                  "cellGroupId": null,
                  "rlc-BearerToAddModList": {
                    "[]": {
                      "logicalChannelIdentity": null,
                      "servedRadioBearer": {
                        "srb-Identity": null
                      },
                      "rlc-Config": {
                        "am": {
                          "ul-AM-RLC": {
                            "sn-FieldLength": null,
                            "t-PollRetransmit": null,
                            "pollPDU": null,
                            "pollByte": null,
                            "maxRetxThreshold": null
                          },
                          "dl-AM-RLC": {
                            "sn-FieldLength": null,
                            "t-Reassembly": null,
                            "t-StatusProhibit": null
                          }
                        }
                      },
                      "mac-LogicalChannelConfig": {
                        "ul-SpecificParameters": {
                          "priority": null,
                          "prioritisedBitRate": null,
                          "bucketSizeDuration": null,
                          "logicalChannelGroup": null,
                          "schedulingRequestID": null,
                          "logicalChannelSR-Mask": null,
                          "logicalChannelSR-DelayTimerApplied": null
                        }
                      }
                    }
                  },
                  "mac-CellGroupConfig": {
                    "schedulingRequestConfig": {
                      "schedulingRequestToAddModList": {
                        "[]": {
                          "schedulingRequestId": null,
                          "sr-ProhibitTimer": null,
                          "sr-TransMax": null
                        }
                      }
                    },
                    "bsr-Config": {
                      "periodicBSR-Timer": null,
                      "retxBSR-Timer": null
                    },
                    "tag-Config": {
                      "tag-ToAddModList": {
                        "[]": {
                          "tag-Id": null,
                          "timeAlignmentTimer": null
                        }
                      }
                    },
                    "phr-Config": {
                      "setup": {
                        "phr-PeriodicTimer": null,
                        "phr-ProhibitTimer": null,
                        "phr-Tx-PowerFactorChange": null,
                        "multiplePHR": null,
                        "dummy": null,
                        "phr-Type2OtherCell": null,
                        "phr-ModeOtherCG": null
                      }
                    },
                    "skipUplinkTxDynamic": null
                  },
                  "spCellConfig": {
                    "spCellConfigDedicated": {
                      "uplinkConfig": {
                        "initialUplinkBWP": {
                          "pucch-Config": {
                            "setup": {
                              "resourceSetToAddModList": {
                                "[]": {
                                  "pucch-ResourceSetId": null,
                                  "resourceList": {
                                    "[]": null
                                  }
                                }
                              },
                              "resourceToAddModList": {
                                "[]": {
                                  "pucch-ResourceId": null,
                                  "startingPRB": null,
                                  "format": {
                                    "format1": {
                                      "initialCyclicShift": null,
                                      "nrofSymbols": null,
                                      "startingSymbolIndex": null,
                                      "timeDomainOCC": null
                                    }
                                  }
                                }
                              },
                              "format1": {
                                "setup": {}
                              },
                              "format2": {
                                "setup": {
                                  "maxCodeRate": null,
                                  "simultaneousHARQ-ACK-CSI": null
                                }
                              },
                              "format3": {
                                "setup": {
                                  "maxCodeRate": null,
                                  "simultaneousHARQ-ACK-CSI": null
                                }
                              },
                              "schedulingRequestResourceToAddModList": {
                                "[]": {
                                  "schedulingRequestResourceId": null,
                                  "schedulingRequestID": null,
                                  "periodicityAndOffset": {
                                    "sl10": null
                                  },
                                  "resource": null
                                }
                              },
                              "dl-DataToUL-ACK": {
                                "[]": null
                              },
                              "pucch-PowerControl": {
                                "deltaF-PUCCH-f0": null,
                                "deltaF-PUCCH-f1": null,
                                "deltaF-PUCCH-f2": null,
                                "deltaF-PUCCH-f3": null,
                                "deltaF-PUCCH-f4": null,
                                "p0-Set": {
                                  "[]": {
                                    "p0-PUCCH-Id": null,
                                    "p0-PUCCH-Value": null
                                  }
                                }
                              }
                            }
                          },
                          "pusch-Config": {
                            "setup": {
                              "pusch-PowerControl": {
                                "msg3-Alpha": null,
                                "p0-NominalWithoutGrant": null,
                                "p0-AlphaSets": {
                                  "[]": {
                                    "p0-PUSCH-AlphaSetId": null,
                                    "p0": null,
                                    "alpha": null
                                  }
                                }
                              },
                              "resourceAllocation": null,
                              "uci-OnPUSCH": {
                                "setup": {
                                  "betaOffsets": {
                                    "semiStatic": {
                                      "betaOffsetACK-Index1": null,
                                      "betaOffsetACK-Index2": null,
                                      "betaOffsetACK-Index3": null,
                                      "betaOffsetCSI-Part1-Index1": null,
                                      "betaOffsetCSI-Part1-Index2": null,
                                      "betaOffsetCSI-Part2-Index1": null,
                                      "betaOffsetCSI-Part2-Index2": null
                                    }
                                  },
                                  "scaling": null
                                }
                              }
                            }
                          }
                        }
                      },
                      "tag-Id": null
                    }
                  }
                }
              }
            }
          }
        }
      },
      "dedicatedNAS-Message": {
        "Direction": null,
        "Ext. PD": null,
        "Security header type": null,
        "Auth. Code": null,
        "Sequence Number": null,
        "2nd Ext. PD": null,
        "2nd Sec. header": null,
        "Message ID": null,
        "Service Request": {
          "Service type": null,
          "ngKSI": {
            "Type of security context flag (TSC)": null,
            "NAS key set identifier": null
          },
          "5G-S-TMSI": {
            "Length": null,
            "Identity Type": null,
            "5G-S-TMSI": {
              "AMF Set ID": null,
              "AMF Pointer": null,
              "5G TMSI": null
            }
          },
          "NAS message container": {
            "IEI": null,
            "Length": null,
            "MM5G Message": null
          },
          "Uplink data status": {
            "IEI": null,
            "Length": null,
            "PSI_7": null,
            "PSI_6": null,
            "PSI_5": null,
            "PSI_4": null,
            "PSI_3": null,
            "PSI_2": null,
            "PSI_1": null,
            "PSI_15": null,
            "PSI_14": null,
            "PSI_13": null,
            "PSI_12": null,
            "PSI_11": null,
            "PSI_10": null,
            "PSI_9": null,
            "PSI_8": null
          },
          "PDU session status": {
            "IEI": null,
            "Length": null,
            "PSI_1": null,
            "PSI_2": null,
            "PSI_3": null,
            "PSI_4": null,
            "PSI_5": null,
            "PSI_6": null,
            "PSI_7": null,
            "PSI_8": null,
            "PSI_9": null,
            "PSI_10": null,
            "PSI_11": null,
            "PSI_12": null,
            "PSI_13": null,
            "PSI_14": null,
            "PSI_15": null
          }
        },
        "Registration Request": {
          "ngKSI": {
            "Type of security context flag (TSC)": null,
            "NAS key set identifier": null
          },
          "5GS registration type": {
            "Follow-on request bit (FOR)": null,
            "5GS registration type value": null
          },
          "5GS Mobile Identity": {
            "Length": null,
            "Identity Type": null,
            "5G-GUTI": {
              "MCC": null,
              "MNC": null,
              "Operator": null,
              "AMF Region ID": null,
              "AMF Set ID": null,
              "AMF Pointer": null,
              "5G TMSI": null
            }
          },
          "UE security capability": {
            "IEI": null,
            "Length": null,
            "EA0_5G": null,
            "EA1_128_5G": null,
            "EA2_128_5G": null,
            "EA3_128_5G": null,
            "EA4_5G": null,
            "EA5_5G": null,
            "EA6_5G": null,
            "EA7_5G": null,
            "IA0_5G": null,
            "IA1_128_5G": null,
            "IA2_128_5G": null,
            "IA3_128_5G": null,
            "IA4_5G": null,
            "IA5_5G": null,
            "IA6_5G": null,
            "IA7_5G": null,
            "EEA0": null,
            "EEA1_128": null,
            "EEA2_128": null,
            "EEA3_128": null,
            "EEA4": null,
            "EEA5": null,
            "EEA6": null,
            "EEA7": null,
            "EIA0": null,
            "EIA1_128": null,
            "EIA2_128": null,
            "EIA3_128": null,
            "EIA4": null,
            "EIA5": null,
            "EIA6": null,
            "EIA7": null
          },
          "UE status": {
            "IEI": null,
            "Length": null,
            "5GMM registration status (N1 mode reg)": null,
            "EMM registration status (S1 mode reg)": null
          },
          "Additional GUTI": {
            "IEI": null,
            "Length": null,
            "Identity Type": null,
            "5G-GUTI": {
              "MCC": null,
              "MNC": null,
              "Operator": null,
              "AMF Region ID": null,
              "AMF Set ID": null,
              "AMF Pointer": null,
              "5G TMSI": null
            }
          },
          "EPS NAS message container": {
            "IEI": null,
            "Length": null,
            "NAS Message": null
          },
          "NAS message container": {
            "IEI": null,
            "Length": null,
            "MM5G Message": null
          }
        },
        "Authentication Request": {
          "ngKSI": {
            "Type of security context flag (TSC)": null,
            "NAS key set identifier": null
          },
          "ABBA": {
            "Length": null,
            "set of security features": null
          },
          "Authentication parameter RAND": {
            "IEI": null,
            "RAND value": null
          },
          "Authentication parameter AUTN": {
            "IEI": null,
            "Length": null,
            "AUTN": {
              "SQN xor AK": null,
              "AMF": null,
              "MAC": null
            }
          }
        },
        "Authentication Response": {
          "Authentication response parameter": {
            "IEI": null,
            "Length": null,
            "RES": null
          }
        },
        "Security Mode Command": {
          "Selected NAS security algorithms": {
            "Type of ciphering algorithm": null,
            "Type of integrity protection algorithm": null
          },
          "ngKSI": {
            "Type of security context flag (TSC)": null,
            "NAS key set identifier": null
          },
          "Replayed UE security capabilities": {
            "Length": null,
            "EA0_5G": null,
            "EA1_128_5G": null,
            "EA2_128_5G": null,
            "EA3_128_5G": null,
            "EA4_5G": null,
            "EA5_5G": null,
            "EA6_5G": null,
            "EA7_5G": null,
            "IA0_5G": null,
            "IA1_128_5G": null,
            "IA2_128_5G": null,
            "IA3_128_5G": null,
            "IA4_5G": null,
            "IA5_5G": null,
            "IA6_5G": null,
            "IA7_5G": null,
            "EEA0": null,
            "EEA1_128": null,
            "EEA2_128": null,
            "EEA3_128": null,
            "EEA4": null,
            "EEA5": null,
            "EEA6": null,
            "EEA7": null,
            "EIA0": null,
            "EIA1_128": null,
            "EIA2_128": null,
            "EIA3_128": null,
            "EIA4": null,
            "EIA5": null,
            "EIA6": null,
            "EIA7": null
          },
          "Selected EPS NAS security algorithms": {
            "IEI": null,
            "Type of ciphering algorithm": null,
            "Type of integrity protection algorithm": null
          },
          "Additional 5G security information": {
            "IEI": null,
            "Length": null,
            "Retransmission of initial NAS message request": null,
            "Horizontal derivation parameter (HDP)": null
          },
          "Replayed S1 UE security capabilities": {
            "IEI": null,
            "Length": null,
            "EEA0": null,
            "128-EEA1": null,
            "128-EEA2": null,
            "128-EEA3": null,
            "EEA4": null,
            "EEA5": null,
            "EEA6": null,
            "EEA7": null,
            "EIA0": null,
            "128-EIA1": null,
            "128-EIA2": null,
            "128-EIA3": null,
            "EIA4": null,
            "EIA5": null,
            "EIA6": null,
            "EIA7": null,
            "UEA0": null,
            "UEA1": null,
            "UEA2": null,
            "UEA3": null,
            "UEA4": null,
            "UEA5": null,
            "UEA6": null,
            "UEA7": null,
            "UIA1": null,
            "UIA2": null,
            "UIA3": null,
            "UIA4": null,
            "UIA5": null,
            "UIA6": null,
            "UIA7": null
          }
        },
        "Security Mode Complete": {
          "NAS message container": {
            "IEI": null,
            "Length": null,
            "MM5G Message": null
          }
        },
        "Registration Complete": {},
        "Registration Accept": {
          "5GS registration result": {
            "Length": null,
            "Disaster roaming registration result": null,
            "Emergency registered": null,
            "Network slice-specific authentication and authorization is to be performed (NSSAA to be performed)": null,
            "SMS over NAS transport allowed": null,
            "5GS registration result value": null
          },
          "5G-GUTI": {
            "IEI": null,
            "Length": null,
            "Identity Type": null,
            "5G-GUTI": {
              "MCC": null,
              "MNC": null,
              "Operator": null,
              "AMF Region ID": null,
              "AMF Set ID": null,
              "AMF Pointer": null,
              "5G TMSI": null
            }
          },
          "TAI list": {
            "IEI": null,
            "Length": null,
            "Partial tracking area identity list": {
              "[]": {
                "Type of list": null,
                "Number of elements": null,
                "MCC": null,
                "MNC": null,
                "Operator": null,
                "TAC": null
              }
            }
          },
          "Allowed NSSAI": {
            "IEI": null,
            "Length": null,
            "S-NSSAI": {
              "[]": {
                "Length": null,
                "Slice/service type (SST)": null,
                "SD": {
                  "MCC": null,
                  "MNC": null
                }
              }
            }
          },
          "Configured NSSAI": {
            "IEI": null,
            "Length": null,
            "S-NSSAI": {
              "[]": {
                "Length": null,
                "Slice/service type (SST)": null,
                "SD": {
                  "MCC": null,
                  "MNC": null
                }
              }
            }
          },
          "5GS network feature support": {
            "IEI": null,
            "Length": null,
            "MPS indicator (MPSI)": null,
            "Interworking without N26 interface indicator (IWK N26)": null,
            "Emergency service fallback indicator for 3GPP access (EMF)": null,
            "Emergency service support indicator for 3GPP access (EMC)": null,
            "IMS voice over PS session over non-3GPP access indicator (IMS-VoPS-N3GPP)": null,
            "IMS voice over PS session over 3GPP access indicator (IMS-VoPS-3GPP)": null
          },
          "PDU session status": {
            "IEI": null,
            "Length": null,
            "PSI_1": null,
            "PSI_2": null,
            "PSI_3": null,
            "PSI_4": null,
            "PSI_5": null,
            "PSI_6": null,
            "PSI_7": null,
            "PSI_8": null,
            "PSI_9": null,
            "PSI_10": null,
            "PSI_11": null,
            "PSI_12": null,
            "PSI_13": null,
            "PSI_14": null,
            "PSI_15": null
          },
          "T3512 value": {
            "IEI": null,
            "Length": null,
            "Unit": null,
            "Timer Value": null
          },
          "T3502 value": {
            "IEI": null,
            "Length": null,
            "Unit": null,
            "Timer value": null
          },
          "Emergency number list": {
            "IEI": null,
            "Length": null,
            "Number": {
              "[]": {
                "Emergency Service Category": {
                  "Mountain Rescue": null,
                  "Marine Guard": null,
                  "Fire Brigade": null,
                  "Ambulance": null,
                  "Police": null
                },
                "Digits": null
              }
            }
          }
        }
      },
      "MM5G Message": {
        "Direction": null,
        "Ext. PD": null,
        "Security header type": null,
        "Message ID": null,
        "Service Request": {
          "Service type": null,
          "ngKSI": {
            "Type of security context flag (TSC)": null,
            "NAS key set identifier": null
          },
          "5G-S-TMSI": {
            "Length": null,
            "Identity Type": null,
            "5G-S-TMSI": {
              "AMF Set ID": null,
              "AMF Pointer": null,
              "5G TMSI": null
            }
          },
          "PDU session status": {
            "IEI": null,
            "Length": null,
            "PSI_1": null,
            "PSI_2": null,
            "PSI_3": null,
            "PSI_4": null,
            "PSI_5": null,
            "PSI_6": null,
            "PSI_7": null,
            "PSI_8": null,
            "PSI_9": null,
            "PSI_10": null,
            "PSI_11": null,
            "PSI_12": null,
            "PSI_13": null,
            "PSI_14": null,
            "PSI_15": null
          },
          "Uplink data status": {
            "IEI": null,
            "Length": null,
            "PSI_7": null,
            "PSI_6": null,
            "PSI_5": null,
            "PSI_4": null,
            "PSI_3": null,
            "PSI_2": null,
            "PSI_1": null,
            "PSI_15": null,
            "PSI_14": null,
            "PSI_13": null,
            "PSI_12": null,
            "PSI_11": null,
            "PSI_10": null,
            "PSI_9": null,
            "PSI_8": null
          }
        },
        "Registration Request": {
          "ngKSI": {
            "Type of security context flag (TSC)": null,
            "NAS key set identifier": null
          },
          "5GS registration type": {
            "Follow-on request bit (FOR)": null,
            "5GS registration type value": null
          },
          "5GS Mobile Identity": {
            "Length": null,
            "Identity Type": null,
            "5G-GUTI": {
              "MCC": null,
              "MNC": null,
              "Operator": null,
              "AMF Region ID": null,
              "AMF Set ID": null,
              "AMF Pointer": null,
              "5G TMSI": null
            }
          },
          "5GMM capability": {
            "IEI": null,
            "Length": null,
            "Service gap control (SGC)": null,
            "IP header compression for control plane CIoT 5GS optimization (5G-IPHC-CP CIoT)": null,
            "N3 data transfer (N3 data)": null,
            "Control plane CIoT 5GS optimization (5G-CP CIoT)": null,
            "Restriction on use of enhanced coverage support (RestrictEC)": null,
            "LTE Positioning Protocol (LPP) capability": null,
            "Handover support (HO attach)": null,
            "EPC NAS supported (S1 mode)": null
          },
          "UE security capability": {
            "IEI": null,
            "Length": null,
            "EA0_5G": null,
            "EA1_128_5G": null,
            "EA2_128_5G": null,
            "EA3_128_5G": null,
            "EA4_5G": null,
            "EA5_5G": null,
            "EA6_5G": null,
            "EA7_5G": null,
            "IA0_5G": null,
            "IA1_128_5G": null,
            "IA2_128_5G": null,
            "IA3_128_5G": null,
            "IA4_5G": null,
            "IA5_5G": null,
            "IA6_5G": null,
            "IA7_5G": null,
            "EEA0": null,
            "EEA1_128": null,
            "EEA2_128": null,
            "EEA3_128": null,
            "EEA4": null,
            "EEA5": null,
            "EEA6": null,
            "EEA7": null,
            "EIA0": null,
            "EIA1_128": null,
            "EIA2_128": null,
            "EIA3_128": null,
            "EIA4": null,
            "EIA5": null,
            "EIA6": null,
            "EIA7": null
          },
          "Requested NSSAI": {
            "IEI": null,
            "Length": null,
            "S-NSSAI": {
              "[]": {
                "Length": null,
                "Slice/service type (SST)": null,
                "SD": {
                  "MCC": null,
                  "MNC": null
                }
              }
            }
          },
          "Last visited registered TAI": {
            "IEI": null,
            "MCC": null,
            "MNC": null,
            "Operator": null,
            "TAC": null
          },
          "S1 UE network capability": {
            "IEI": null,
            "Length": null,
            "EEA0": null,
            "128-EEA1": null,
            "128-EEA2": null,
            "128-EEA3": null,
            "EEA4": null,
            "EEA5": null,
            "EEA6": null,
            "EEA7": null,
            "EIA0": null,
            "128-EIA1": null,
            "128-EIA2": null,
            "128-EIA3": null,
            "EIA4": null,
            "EIA5": null,
            "EIA6": null,
            "EIA7": null,
            "UEA0": null,
            "UEA1": null,
            "UEA2": null,
            "UEA3": null,
            "UEA4": null,
            "UEA5": null,
            "UEA6": null,
            "UEA7": null,
            "UCS2 support (UCS2)": null,
            "UIA1": null,
            "UIA2": null,
            "UIA3": null,
            "UIA4": null,
            "UIA5": null,
            "UIA6": null,
            "UIA7": null,
            "ProSe direct discovery (ProSe-dd)": null,
            "the capability for ProSe": null,
            "H.245 After SRVCC Handover capability (H.245-ASH)": null,
            "Access class control for CSFB (ACC-CSFB) capability": null,
            "LTE Positioning Protocol (LPP) capability": null,
            "Location services (LCS) notification mechanisms capability": null,
            "1xSRVCC capability": null,
            "NF capability": null,
            "Extended protocol configuration options (ePCO)": null,
            "Header compression for control plane CIoT EPS optimization (HC-CP CIoT)": null,
            "EMM-REGISTERED without PDN connection (ERw/oPDN)": null,
            "S1-u data transfer (S1-U data)": null,
            "User plane CIoT EPS optimization (UP CIoT)": null,
            "Control plane CIoT EPS optimization (CP CIoT)": null,
            "ProSe UE-to-network-relay (ProSe-relay)": null,
            "ProSe direct communication (ProSe-dc)": null,
            "Signalling for a maximum number of 15 EPS bearer contexts (15 bearers)": null,
            "Service gap control (SGC)": null,
            "N1 mode supported (N1mode)": null,
            "Dual connectivity with NR (DCNR)": null,
            "Control plane data backoff support (CP backoff)": null,
            "Restriction on use of enhanced coverage support (RestrictEC)": null,
            "V2X communication over PC5 (V2X PC5)": null,
            "Multiple DRB support (multipleDRB)": null
          },
          "Uplink data status": {
            "IEI": null,
            "Length": null,
            "PSI_7": null,
            "PSI_6": null,
            "PSI_5": null,
            "PSI_4": null,
            "PSI_3": null,
            "PSI_2": null,
            "PSI_1": null,
            "PSI_15": null,
            "PSI_14": null,
            "PSI_13": null,
            "PSI_12": null,
            "PSI_11": null,
            "PSI_10": null,
            "PSI_9": null,
            "PSI_8": null
          },
          "PDU session status": {
            "IEI": null,
            "Length": null,
            "PSI_1": null,
            "PSI_2": null,
            "PSI_3": null,
            "PSI_4": null,
            "PSI_5": null,
            "PSI_6": null,
            "PSI_7": null,
            "PSI_8": null,
            "PSI_9": null,
            "PSI_10": null,
            "PSI_11": null,
            "PSI_12": null,
            "PSI_13": null,
            "PSI_14": null,
            "PSI_15": null
          },
          "UE status": {
            "IEI": null,
            "Length": null,
            "5GMM registration status (N1 mode reg)": null,
            "EMM registration status (S1 mode reg)": null
          },
          "Additional GUTI": {
            "IEI": null,
            "Length": null,
            "Identity Type": null,
            "5G-GUTI": {
              "MCC": null,
              "MNC": null,
              "Operator": null,
              "AMF Region ID": null,
              "AMF Set ID": null,
              "AMF Pointer": null,
              "5G TMSI": null
            }
          },
          "UE's usage setting": {
            "IEI": null,
            "Length": null,
            "UE's usage setting": null
          },
          "EPS NAS message container": {
            "IEI": null,
            "Length": null,
            "NAS Message": null
          },
          "LADN indication": {
            "IEI": null,
            "Length": null
          },
          "Network slicing indication": {
            "IEI": null,
            "Default configured NSSAI indication (DCNI)": null,
            "Network slicing subscription change indication (NSSCI)": null
          },
          "5GS update type": {
            "IEI": null,
            "Length": null,
            "EPS Preferred CIoT network behaviour (EPS-PNB-CIoT)": null,
            "5GS Preferred CIoT network behaviour (5GS PNB-CIoT)": null,
            "NG-RAN Radio Capability Update (NG-RAN-RCU)": null,
            "SMS over NAS transport requested (SMS requested)": null
          }
        }
      },
      "Direction": null,
      "Ext. PD": null,
      "Security header type": null,
      "Auth. Code": null,
      "Sequence Number": null,
      "2nd Ext. PD": null,
      "2nd Sec. header": null,
      "Message ID": null,
      "Service Accept": {
        "PDU session status": {
          "IEI": null,
          "Length": null,
          "PSI_1": null,
          "PSI_2": null,
          "PSI_3": null,
          "PSI_4": null,
          "PSI_5": null,
          "PSI_6": null,
          "PSI_7": null,
          "PSI_8": null,
          "PSI_9": null,
          "PSI_10": null,
          "PSI_11": null,
          "PSI_12": null,
          "PSI_13": null,
          "PSI_14": null,
          "PSI_15": null
        },
        "PDU session reactivation result": {
          "IEI": null,
          "Length": null,
          "PSI_1": null,
          "PSI_2": null,
          "PSI_3": null,
          "PSI_4": null,
          "PSI_5": null,
          "PSI_6": null,
          "PSI_7": null,
          "PSI_8": null,
          "PSI_9": null,
          "PSI_10": null,
          "PSI_11": null,
          "PSI_12": null,
          "PSI_13": null,
          "PSI_14": null,
          "PSI_15": null
        }
      },
      "bcch-dl-sch": {
        "c1": {
          "systemInformationBlockType1": {
            "cellSelectionInfo": {
              "q-RxLevMin": null,
              "q-QualMin": null
            },
            "cellAccessRelatedInfo": {
              "plmn-IdentityInfoList": {
                "[]": {
                  "plmn-IdentityList": {
                    "[]": {
                      "mcc": {
                        "[]": null
                      },
                      "mnc": {
                        "[]": null
                      }
                    }
                  },
                  "trackingAreaCode": null,
                  "ranac": null,
                  "cellIdentity": null,
                  "cellReservedForOperatorUse": null
                }
              }
            },
            "connEstFailureControl": {
              "connEstFailCount": null,
              "connEstFailOffsetValidity": null,
              "connEstFailOffset": null
            },
            "si-SchedulingInfo": {
              "schedulingInfoList": {
                "[]": {
                  "si-BroadcastStatus": null,
                  "si-Periodicity": null,
                  "sib-MappingInfo": {
                    "[]": {
                      "type": null,
                      "valueTag": null
                    }
                  }
                }
              },
              "si-WindowLength": null
            },
            "servingCellConfigCommon": {
              "downlinkConfigCommon": {
                "frequencyInfoDL": {
                  "frequencyBandList": {
                    "[]": {
                      "freqBandIndicatorNR": null
                    }
                  },
                  "offsetToPointA": null,
                  "scs-SpecificCarrierList": {
                    "[]": {
                      "offsetToCarrier": null,
                      "subcarrierSpacing": null,
                      "carrierBandwidth": null
                    }
                  }
                },
                "initialDownlinkBWP": {
                  "genericParameters": {
                    "locationAndBandwidth": null,
                    "subcarrierSpacing": null
                  },
                  "pdcch-ConfigCommon": {
                    "setup": {
                      "controlResourceSetZero": null,
                      "commonSearchSpaceList": {
                        "[]": {
                          "searchSpaceId": null,
                          "controlResourceSetId": null,
                          "monitoringSlotPeriodicityAndOffset": {
                            "sl1": null
                          },
                          "monitoringSymbolsWithinSlot": null,
                          "nrofCandidates": {
                            "aggregationLevel1": null,
                            "aggregationLevel2": null,
                            "aggregationLevel4": null,
                            "aggregationLevel8": null,
                            "aggregationLevel16": null
                          },
                          "searchSpaceType": {
                            "common": {
                              "dci-Format0-0-AndFormat1-0": {}
                            }
                          }
                        }
                      },
                      "searchSpaceSIB1": null,
                      "searchSpaceOtherSystemInformation": null,
                      "pagingSearchSpace": null,
                      "ra-SearchSpace": null
                    }
                  },
                  "pdsch-ConfigCommon": {
                    "setup": {
                      "pdsch-TimeDomainAllocationList": {
                        "[]": {
                          "k0": null,
                          "mappingType": null,
                          "startSymbolAndLength": null
                        }
                      }
                    }
                  }
                },
                "bcch-Config": {
                  "modificationPeriodCoeff": null
                },
                "pcch-Config": {
                  "defaultPagingCycle": null,
                  "nAndPagingFrameOffset": {
                    "quarterT": null
                  },
                  "ns": null
                }
              },
              "uplinkConfigCommon": {
                "frequencyInfoUL": {
                  "frequencyBandList": {
                    "[]": {
                      "freqBandIndicatorNR": null
                    }
                  },
                  "absoluteFrequencyPointA": null,
                  "scs-SpecificCarrierList": {
                    "[]": {
                      "offsetToCarrier": null,
                      "subcarrierSpacing": null,
                      "carrierBandwidth": null
                    }
                  },
                  "p-Max": null
                },
                "initialUplinkBWP": {
                  "genericParameters": {
                    "locationAndBandwidth": null,
                    "subcarrierSpacing": null
                  },
                  "rach-ConfigCommon": {
                    "setup": {
                      "rach-ConfigGeneric": {
                        "prach-ConfigurationIndex": null,
                        "msg1-FDM": null,
                        "msg1-FrequencyStart": null,
                        "zeroCorrelationZoneConfig": null,
                        "preambleReceivedTargetPower": null,
                        "preambleTransMax": null,
                        "powerRampingStep": null,
                        "ra-ResponseWindow": null
                      },
                      "totalNumberOfRA-Preambles": null,
                      "ssb-perRACH-OccasionAndCB-PreamblesPerSSB": {
                        "one": null,
                        "eight": null
                      },
                      "groupBconfigured": {
                        "ra-Msg3SizeGroupA": null,
                        "messagePowerOffsetGroupB": null,
                        "numberOfRA-PreamblesGroupA": null
                      },
                      "ra-ContentionResolutionTimer": null,
                      "prach-RootSequenceIndex": {
                        "l839": null
                      },
                      "restrictedSetConfig": null,
                      "rsrp-ThresholdSSB": null
                    }
                  },
                  "pusch-ConfigCommon": {
                    "setup": {
                      "pusch-TimeDomainAllocationList": {
                        "[]": {
                          "k2": null,
                          "mappingType": null,
                          "startSymbolAndLength": null
                        }
                      },
                      "msg3-DeltaPreamble": null,
                      "p0-NominalWithGrant": null
                    }
                  },
                  "pucch-ConfigCommon": {
                    "setup": {
                      "pucch-ResourceCommon": null,
                      "pucch-GroupHopping": null,
                      "hoppingId": null,
                      "p0-nominal": null,
                      "pucch-ResourceCommonRedCap-r17": null
                    }
                  }
                },
                "timeAlignmentTimerCommon": null
              },
              "n-TimingAdvanceOffset": null,
              "ssb-PositionsInBurst": {
                "inOneGroup": null
              },
              "ssb-PeriodicityServingCell": null,
              "ss-PBCH-BlockPower": null,
              "tdd-UL-DL-ConfigurationCommon": {
                "referenceSubcarrierSpacing": null,
                "pattern1": {
                  "dl-UL-TransmissionPeriodicity": null,
                  "nrofDownlinkSlots": null,
                  "nrofDownlinkSymbols": null,
                  "nrofUplinkSlots": null,
                  "nrofUplinkSymbols": null
                },
                "pattern2": {
                  "dl-UL-TransmissionPeriodicity": null,
                  "nrofDownlinkSlots": null,
                  "nrofDownlinkSymbols": null,
                  "nrofUplinkSlots": null,
                  "nrofUplinkSymbols": null
                }
              }
            },
            "ue-TimersAndConstants": {
              "t300": null,
              "t301": null,
              "t310": null,
              "n310": null,
              "t311": null,
              "n311": null,
              "t319": null
            },
            "nonCriticalExtension": {
              "nonCriticalExtension": {
                "nonCriticalExtension": {
                  "redCap-ConfigCommon-r17": {
                    "cellBarredRedCap-r17": {
                      "cellBarredRedCap1Rx-r17": null,
                      "cellBarredRedCap2Rx-r17": null
                    }
                  },
                  "intraFreqReselectionRedCap-r17": null
                }
              }
            }
          },
          "systemInformation": {
            "criticalExtensions": {
              "systemInformation": {
                "sib-TypeAndInfo": {
                  "[]": {
                    "sib2": {
                      "cellReselectionInfoCommon": {
                        "nrofSS-BlocksToAverage": null,
                        "absThreshSS-BlocksConsolidation": {
                          "thresholdRSRP": null,
                          "thresholdRSRQ": null,
                          "thresholdSINR": null
                        },
                        "q-Hyst": null
                      },
                      "cellReselectionServingFreqInfo": {
                        "s-NonIntraSearchP": null,
                        "s-NonIntraSearchQ": null,
                        "threshServingLowP": null,
                        "cellReselectionPriority": null,
                        "cellReselectionSubPriority": null
                      },
                      "intraFreqCellReselectionInfo": {
                        "q-RxLevMin": null,
                        "q-QualMin": null,
                        "s-IntraSearchP": null,
                        "t-ReselectionNR": null,
                        "p-Max": null,
                        "smtc": {
                          "periodicityAndOffset": {
                            "sf20": null
                          },
                          "duration": null
                        },
                        "ssb-ToMeasure": {
                          "mediumBitmap": null
                        },
                        "deriveSSB-IndexFromCell": null
                      }
                    },
                    "sib3": {
                      "intraFreqNeighCellList": {
                        "[]": {
                          "physCellId": null,
                          "q-OffsetCell": null
                        }
                      },
                      "intraFreqExcludedCellList": {
                        "[]": {
                          "start": null
                        }
                      }
                    },
                    "sib4": {
                      "interFreqCarrierFreqList": {
                        "[]": {
                          "dl-CarrierFreq": null,
                          "frequencyBandList": {
                            "[]": {
                              "freqBandIndicatorNR": null
                            }
                          },
                          "nrofSS-BlocksToAverage": null,
                          "absThreshSS-BlocksConsolidation": {
                            "thresholdRSRP": null,
                            "thresholdRSRQ": null,
                            "thresholdSINR": null
                          },
                          "smtc": {
                            "periodicityAndOffset": {
                              "sf20": null
                            },
                            "duration": null
                          },
                          "ssbSubcarrierSpacing": null,
                          "ssb-ToMeasure": {
                            "mediumBitmap": null
                          },
                          "deriveSSB-IndexFromCell": null,
                          "q-RxLevMin": null,
                          "q-QualMin": null,
                          "p-Max": null,
                          "t-ReselectionNR": null,
                          "threshX-HighP": null,
                          "threshX-LowP": null,
                          "threshX-Q": {
                            "threshX-HighQ": null,
                            "threshX-LowQ": null
                          },
                          "cellReselectionPriority": null,
                          "cellReselectionSubPriority": null,
                          "interFreqNeighCellList": {
                            "[]": {
                              "physCellId": null,
                              "q-OffsetCell": null
                            }
                          }
                        }
                      },
                      "interFreqCarrierFreqList-v1700": {
                        "[]": {
                          "redCapAccessAllowed-r17": null
                        }
                      }
                    },
                    "sib5": {
                      "carrierFreqListEUTRA": {
                        "[]": {
                          "carrierFreq": null,
                          "allowedMeasBandwidth": null,
                          "presenceAntennaPort1": null,
                          "cellReselectionPriority": null,
                          "threshX-High": null,
                          "threshX-Low": null,
                          "q-RxLevMin": null,
                          "q-QualMin": null,
                          "p-MaxEUTRA": null,
                          "threshX-Q": {
                            "threshX-HighQ": null,
                            "threshX-LowQ": null
                          }
                        }
                      },
                      "t-ReselectionEUTRA": null
                    }
                  }
                }
              }
            }
          }
        }
      },
      "NAS Message": {
        "Direction": null,
        "Security header or skip ind": null,
        "Protocol Discriminator": null,
        "Msg auth. code": null,
        "Sequence Number": null,
        "2nd Sec. header": null,
        "2nd PD": null,
        "Message ID": null,
        "Tracking Area Update Request": {
          "neKSI": {
            "Type of security context flag (TSC)": null,
            "NAS KSI": null
          },
          "EPS update type": {
            "Active Flag": null,
            "EPS update type value": null
          },
          "Old GUTI": {
            "Length": null,
            "Type of identity": null,
            "Odd Even Ind": null,
            "GUTI": {
              "MCC": null,
              "MNC": null,
              "Operator": null,
              "MME Group ID": null,
              "MME Code": null,
              "M-TMSI": null
            }
          }
        }
      },
      "Registration Accept": {
        "5GS registration result": {
          "Length": null,
          "Disaster roaming registration result": null,
          "Emergency registered": null,
          "Network slice-specific authentication and authorization is to be performed (NSSAA to be performed)": null,
          "SMS over NAS transport allowed": null,
          "5GS registration result value": null
        },
        "5G-GUTI": {
          "IEI": null,
          "Length": null,
          "Identity Type": null,
          "5G-GUTI": {
            "MCC": null,
            "MNC": null,
            "Operator": null,
            "AMF Region ID": null,
            "AMF Set ID": null,
            "AMF Pointer": null,
            "5G TMSI": null
          }
        },
        "TAI list": {
          "IEI": null,
          "Length": null,
          "Partial tracking area identity list": {
            "[]": {
              "Type of list": null,
              "Number of elements": null,
              "MCC": null,
              "MNC": null,
              "Operator": null,
              "TAC": null
            }
          }
        },
        "Allowed NSSAI": {
          "IEI": null,
          "Length": null,
          "S-NSSAI": {
            "[]": {
              "Length": null,
              "Slice/service type (SST)": null,
              "SD": {
                "MCC": null,
                "MNC": null
              }
            }
          }
        },
        "Configured NSSAI": {
          "IEI": null,
          "Length": null,
          "S-NSSAI": {
            "[]": {
              "Length": null,
              "Slice/service type (SST)": null,
              "SD": {
                "MCC": null,
                "MNC": null
              }
            }
          }
        },
        "5GS network feature support": {
          "IEI": null,
          "Length": null,
          "MPS indicator (MPSI)": null,
          "Interworking without N26 interface indicator (IWK N26)": null,
          "Emergency service fallback indicator for 3GPP access (EMF)": null,
          "Emergency service support indicator for 3GPP access (EMC)": null,
          "IMS voice over PS session over non-3GPP access indicator (IMS-VoPS-N3GPP)": null,
          "IMS voice over PS session over 3GPP access indicator (IMS-VoPS-3GPP)": null
        },
        "PDU session status": {
          "IEI": null,
          "Length": null,
          "PSI_1": null,
          "PSI_2": null,
          "PSI_3": null,
          "PSI_4": null,
          "PSI_5": null,
          "PSI_6": null,
          "PSI_7": null,
          "PSI_8": null,
          "PSI_9": null,
          "PSI_10": null,
          "PSI_11": null,
          "PSI_12": null,
          "PSI_13": null,
          "PSI_14": null,
          "PSI_15": null
        },
        "PDU session reactivation result": {
          "IEI": null,
          "Length": null,
          "PSI_1": null,
          "PSI_2": null,
          "PSI_3": null,
          "PSI_4": null,
          "PSI_5": null,
          "PSI_6": null,
          "PSI_7": null,
          "PSI_8": null,
          "PSI_9": null,
          "PSI_10": null,
          "PSI_11": null,
          "PSI_12": null,
          "PSI_13": null,
          "PSI_14": null,
          "PSI_15": null
        },
        "T3512 value": {
          "IEI": null,
          "Length": null,
          "Unit": null,
          "Timer Value": null
        },
        "T3502 value": {
          "IEI": null,
          "Length": null,
          "Unit": null,
          "Timer value": null
        },
        "Emergency number list": {
          "IEI": null,
          "Length": null,
          "Number": {
            "[]": {
              "Emergency Service Category": {
                "Mountain Rescue": null,
                "Marine Guard": null,
                "Fire Brigade": null,
                "Ambulance": null,
                "Police": null
              },
              "Digits": null
            }
          }
        }
      },
      "pdu-radioBearerConfig": {
        "drb-ToAddModList": {
          "[]": {
            "cnAssociation": {
              "eps-BearerIdentity": null
            },
            "drb-Identity": null,
            "pdcp-Config": {
              "drb": {
                "discardTimer": null,
                "pdcp-SN-SizeUL": null,
                "pdcp-SN-SizeDL": null,
                "headerCompression": {
                  "notUsed": null
                }
              },
              "t-Reordering": null
            },
            "reestablishPDCP": null
          }
        },
        "securityConfig": {
          "securityAlgorithmConfig": {
            "cipheringAlgorithm": null,
            "integrityProtAlgorithm": null
          },
          "keyToUse": null
        }
      }
    }
  },
  "0xB950 NR5G ML1 DL Common Config": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G ML1 DL Common Config": {
      "Version": null,
      "Versions": {
        "Current SFN time": {
          "Slot": null,
          "Sub FN": null,
          "Sys FN": null,
          "SCS": null
        }
      },
      "OTA Cfg Param": {
        "Logging time Sub FN": null,
        "Logging time Sys FN": null,
        "Num cg add mod": null,
        "CG Add Mod": {
          "Log mask": null,
          "Common Cg Config": {
            "Cell group Id": null,
            "Crnti CFG": null,
            "Target Dl Cell Frequency": null,
            "Target Phy Cell Id": null,
            "CFG Mask": null,
            "CC Id Del Bmask": null,
            "CC Id addmod bmask": null,
            "RLM in sync out of sync threshold": null,
            "Mac main CFG": {
              "Is Cdrx Config Present": null
            }
          },
          "Per CC Config": {
            "Cell Info": {
              "Band": null,
              "Phy Cell Id": null,
              "SSB Sub Carrier Spacing": null,
              "DL Cell frequency": null
            },
            "Duplex Mode": null,
            "SCC Id": null,
            "serv_cell_idx": null,
            "num_coreset_add_mod": null,
            "num_search_space_add_mod": null,
            "num_dl_bwp_id_addmod": null,
            "num_ul_bwp_id_addmod": null,
            "dl_bwp_id_rel_bmask": null,
            "dl_bwp_id_addmod_bmask": null,
            "ul_bwp_id_rel_bmask": null,
            "ul_bwp_id_addmod_bmask": null,
            "cfg_mask": null,
            "CC Common CFG": {
              "dmrs_type_a_pos": null,
              "SS PBCH BLK PWR": null,
              "SSB Period": null,
              "Rate Match Pattern Id Rel Bmask": null,
              "Rate Match Pattern Add Mod Mask": null,
              "CFG Mask": null,
              "Sub Carr Spacing": null,
              "SSB POS In Burst Bmask": null,
              "Lte Crs To Match Around": {
                "Enable": null,
                "DL Freq": null,
                "DL Bandwidth": null,
                "Num Crs Ports": null,
                "V Shift": null,
                "CFG Mask": null,
                "Num Mbsfn Subframe Config": null
              },
              "TDD UL DL CFG": {
                "Enable": null,
                "Ref Scs": null,
                "Pattern2 Enable": null,
                "Pattern 1": {
                  "DL Ul trans Period": null,
                  "Num DL Sym": null,
                  "Num Ul Sym": null,
                  "Num DL Slots": null,
                  "Num Ul Slots": null
                },
                "Pattern 2": {
                  "DL Ul trans Period": null,
                  "Num DL Sym": null,
                  "Num Ul Sym": null,
                  "Num DL Slots": null,
                  "Num Ul Slots": null
                }
              }
            },
            "CC Dedicated CFG": {
              "Tag Id": null,
              "BWP Inact Timer": null,
              "First Active DL bwp Id": null,
              "Default Dl Bwp Id": null,
              "First Active Ul Bwp": null,
              "UE Beam lock Fn": null,
              "Serving Cell mo id": null,
              "CFG Mask": null,
              "Scell Deact Timer": null,
              "Path loss Reference linking": null,
              "Antenna Info DL": {
                "Max Mimo Lyr Cfged": null,
                "Max Num Mimo Lyr": null,
                "Max Num rx": null
              },
              "Pdsch Serv Cell Cfg": {
                "Enable": null,
                "XoverHead": null,
                "Num Harq Processes": null,
                "Cfg Mask": null,
                "Pucch Cell": null,
                "cbg_cfg": {
                  "Enable": null,
                  "Max Cbg Per Tb": null,
                  "Cbg Flush Ind": null
                }
              },
              "Cross Car Scheduling Cfg": {
                "Scheduling Cell Info": {
                  "Cross Carrier Scheduling Type": null,
                  "cross_carr_scheduling_params": {
                    "Own": {
                      "CIF Presence": null
                    }
                  }
                }
              },
              "Lte Crs to Match Around": {
                "Enable": null,
                "DL Freq": null,
                "DL Bandwidth": null,
                "Num Crs Ports": null,
                "V Shift": null,
                "CFG Mask": null,
                "Num Mbsfn Subframe Config": null
              }
            },
            "DL Frequency Info": {
              "Abs Freq SSB": null,
              "Abs Freq Point A": null,
              "Num Scs Carriers": null,
              "Multi frequency Band List": {
                "Num Bands": null,
                "Frequency Band Indicator": {
                  "[]": null
                }
              },
              "Scs Spec Carrier List": {
                "[]": {
                  "Offset To Carrier": null,
                  "Carrier BW Prb": null,
                  "SCS": null,
                  "Carrier BW": null
                }
              }
            },
            "UL Frequency Info": {
              "Abs Freq Point A": null,
              "P Max": null,
              "Add Spectrum emission Present": null,
              "Add Spectrum Emission": null,
              "Freq Shift 7p5_khz": null,
              "Num SCS Carriers": null,
              "Multi Frequency band List": {
                "Num Bands": null,
                "Frequency Band Indicator": {
                  "[]": null
                }
              },
              "Scs Spec Carrier List": {
                "[]": {
                  "Offset To Carrier": null,
                  "Carrier BW Prb": null,
                  "SCS": null,
                  "Carrier BW": null
                }
              }
            },
            "DL BWP Params": {
              "[]": {
                "BWP Generic Params": {
                  "BWP Id": null,
                  "Loc And BW": null,
                  "Sub Carrier Spacing": null,
                  "Cyclic Prefix": null
                },
                "CFG mask": null,
                "DL BWP Common": {
                  "CFG Mask": null,
                  "Pdcch Common": {
                    "Enable": null,
                    "Coreset Zero Id": null,
                    "Search Space Zero Id": null,
                    "Coreset Active bmask": null,
                    "Coreset Release Bmask": null,
                    "Search Space Active Bmask": null,
                    "Search Space Rel Bmask": null,
                    "Search Space Id RMSI": null,
                    "Search Space ID OSI": null,
                    "Search Space ID Paging": null,
                    "Search Space ID RA": null
                  },
                  "Pdsch Common": {
                    "Enable": null,
                    "Num Pdsch Alloc List": null,
                    "Pdsch Time Dom Alloc List": {
                      "[]": {
                        "K Present": null,
                        "Mapping type": null,
                        "K": null,
                        "Start Sum and length": null
                      }
                    }
                  }
                },
                "DL BWP Dedicated": {
                  "CFG Mask": null,
                  "Pdsch CFG DED": {
                    "Enable": null,
                    "Mcs Table": null,
                    "Rbg Size": null,
                    "CFG Mask": null,
                    "Pdsch Rsc Alloc": null,
                    "Max Code words Scheduled by DCI": null,
                    "Vrb to Prb InterLeaver": null,
                    "Data Scr Id": null,
                    "Num Pdsch Alloc List": null,
                    "Num Prb Bundling": {
                      "Prb Bundling Type": null,
                      "Static Bundle Size": null,
                      "Dyncamic Bundle Size Set1": null,
                      "Dyncamic Bundle Size Set2": null
                    },
                    "Dmrs Dl Type A": {
                      "Enable": null,
                      "Max Length": null,
                      "CFG Mask": null,
                      "Dmrs Type": null,
                      "Dmrs Pos": null,
                      "Dmrs Scr Id0": null,
                      "Dmrs Scr Id1": null,
                      "Phase Tracking Rs": {
                        "Enable": null,
                        "Rsc Element Offeset": null,
                        "Epre Ratio": null,
                        "CFG Mask": null,
                        "Freq Density": {
                          "[]": null
                        },
                        "Time Density": {
                          "[]": null
                        }
                      }
                    }
                  }
                }
              }
            },
            "UL BWP Addmod": {
              "[]": {
                "BWP Id": null,
                "Loc And BW": null,
                "Sub Carrier Spacing": null,
                "Cyclic Prefix": null
              }
            },
            "Coreset Add Mod": {
              "[]": {
                "Control Resource Set ID": null,
                "Duration": null,
                "Freq_Dom_Rsc": null,
                "TCI_States_Pdcch_To_Add_Bmask": null,
                "TCI_States_Pdcch_To_Rel_Bmask": null,
                "TCI_Present_in_DCI": null,
                "Pdcch Dmrs Scr ID": null,
                "Precoder Gran": null,
                "CCE Req Mapping": {
                  "CCE_Reg_Mapping_type": null,
                  "Interleaved_CCE_Req_Mapping": {
                    "Req Bundle Size": null,
                    "Precoder_Gran": null,
                    "InterLeaver Rows": null,
                    "Shift Index": null
                  }
                }
              }
            },
            "Search Space Add Mod": {
              "[]": {
                "Search Space Id": null,
                "num_candidates_aggregation_level": {
                  "Aggregration Level 1": null,
                  "Aggregration Level 2": null,
                  "Aggregration Level 4": null,
                  "Aggregration Level 8": null,
                  "Aggregration Level 16": null
                },
                "CFG Mask": null,
                "Mon Slot Period": null,
                "Control Resource Set Id": null,
                "Mon Slot offeset": null,
                "Mon sym within slot bmask": null,
                "Search Space": {
                  "sspace type": null,
                  "sspace_info": {
                    "common_sspace_0": {
                      "CFG Mask": null,
                      "Format_00_and Format_10": {
                        "Temp1": null
                      },
                      "Format_20": {
                        "Aggregation Level is Valid": null,
                        "Nr of Candidate SFI": {
                          "Aggregration Level 1": null,
                          "Aggregration Level 2": null,
                          "Aggregration Level 4": null,
                          "Aggregration Level 8": null,
                          "Aggregration Level 16": null
                        }
                      },
                      "Format_21": {
                        "Temp": null
                      },
                      "Format_22": {
                        "Temp": null
                      },
                      "Format_23": {
                        "Mon Period": null,
                        "Num Pddch Cand": null
                      }
                    },
                    "UE spec sspace": {
                      "Format": null
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "0xB951 NR5G ML1 DL Dedicated Config": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G ML1 DL Dedicated Config": {
      "Version": null,
      "Current SFN time": {
        "Slot": null,
        "Sub FN": null,
        "Sys FN": null,
        "SCS": null
      },
      "Is Default CFG": null,
      "OTA Params": {
        "Logging time Sub FN": null,
        "Logging time Sys FN": null,
        "Num cg add mod": null,
        "CG Add Mod": {
          "Log mask": null,
          "Common Cg Config": {
            "Cell group Id": null,
            "Crnti CFG": null,
            "Target Dl Cell Frequency": null,
            "Target Phy Cell Id": null,
            "CFG Mask": null,
            "CC Id Del Bmask": null,
            "CC Id addmod bmask": null,
            "RLM in sync out of sync threshold": null,
            "Mac main CFG": {
              "Is Cdrx Config Present": null,
              "Cdrx Config": {
                "Enable": null,
                "Harq Rtt Timer DL": null,
                "Harq Rtt Timer UL": null,
                "DRX Slot Offset": null,
                "Short Cycle Enable": null,
                "retransmission Timer DL": null,
                "retransmission Timer UL": null,
                "On Duration Timer": {
                  "Type": null,
                  "MS": null
                },
                "Inactivity Timer ms": null,
                "Long Cycle Param": {
                  "Long Cycle Duration ms": null,
                  "Offset": null
                },
                "Short Cycle Param": {
                  "Short Cycle Duration ms": null,
                  "Short Cycle Timer": null
                }
              }
            }
          },
          "Per CC Config": {
            "Cell Info": {
              "Band": null,
              "Phy Cell Id": null,
              "SSB Sub Carrier Spacing": null,
              "DL Cell frequency": null
            },
            "Duplex Mode": null,
            "SCC Id": null,
            "serv_cell_idx": null,
            "num_coreset_add_mod": null,
            "num_search_space_add_mod": null,
            "num_dl_bwp_id_addmod": null,
            "num_ul_bwp_id_addmod": null,
            "dl_bwp_id_rel_bmask": null,
            "dl_bwp_id_addmod_bmask": null,
            "ul_bwp_id_rel_bmask": null,
            "ul_bwp_id_addmod_bmask": null,
            "cfg_mask": null,
            "CC Dedicated CFG": {
              "Tag Id": null,
              "BWP Inact Timer": null,
              "First Active DL bwp Id": null,
              "Default Dl Bwp Id": null,
              "First Active Ul Bwp": null,
              "UE Beam lock Fn": null,
              "Serving Cell mo id": null,
              "CFG Mask": null,
              "Scell Deact Timer": null,
              "Path loss Reference linking": null,
              "Antenna Info DL": {
                "Max Mimo Lyr Cfged": null,
                "Max Num Mimo Lyr": null,
                "Max Num rx": null
              },
              "Pdsch Serv Cell Cfg": {
                "Enable": null,
                "XoverHead": null,
                "Num Harq Processes": null,
                "Cfg Mask": null,
                "Pucch Cell": null,
                "cbg_cfg": {
                  "Enable": null,
                  "Max Cbg Per Tb": null,
                  "Cbg Flush Ind": null
                }
              },
              "Cross Car Scheduling Cfg": {
                "Scheduling Cell Info": {
                  "Cross Carrier Scheduling Type": null,
                  "cross_carr_scheduling_params": {
                    "Own": {
                      "CIF Presence": null
                    }
                  }
                }
              },
              "Lte Crs to Match Around": {
                "Enable": null,
                "DL Freq": null,
                "DL Bandwidth": null,
                "Num Crs Ports": null,
                "V Shift": null,
                "CFG Mask": null,
                "Num Mbsfn Subframe Config": null
              }
            },
            "UL BWP Addmod": {
              "[]": {
                "BWP Id": null,
                "Loc And BW": null,
                "Sub Carrier Spacing": null,
                "Cyclic Prefix": null
              }
            },
            "Coreset Add Mod": {
              "[]": {
                "Control Resource Set ID": null,
                "Duration": null,
                "Freq_Dom_Rsc": null,
                "TCI_States_Pdcch_To_Add_Bmask": null,
                "TCI_States_Pdcch_To_Rel_Bmask": null,
                "TCI_Present_in_DCI": null,
                "Pdcch Dmrs Scr ID": null,
                "Precoder Gran": null,
                "CCE Req Mapping": {
                  "CCE_Reg_Mapping_type": null,
                  "Interleaved_CCE_Req_Mapping": {
                    "Req Bundle Size": null,
                    "Precoder_Gran": null,
                    "InterLeaver Rows": null,
                    "Shift Index": null
                  }
                }
              }
            },
            "Search Space Add Mod": {
              "[]": {
                "Search Space Id": null,
                "num_candidates_aggregation_level": {
                  "Aggregration Level 1": null,
                  "Aggregration Level 2": null,
                  "Aggregration Level 4": null,
                  "Aggregration Level 8": null,
                  "Aggregration Level 16": null
                },
                "CFG Mask": null,
                "Mon Slot Period": null,
                "Control Resource Set Id": null,
                "Mon Slot offeset": null,
                "Mon sym within slot bmask": null,
                "Search Space": {
                  "sspace type": null,
                  "sspace_info": {
                    "common_sspace_0": {
                      "CFG Mask": null,
                      "Format_00_and Format_10": {
                        "Temp1": null
                      },
                      "Format_20": {
                        "Aggregation Level is Valid": null,
                        "Nr of Candidate SFI": {
                          "Aggregration Level 1": null,
                          "Aggregration Level 2": null,
                          "Aggregration Level 4": null,
                          "Aggregration Level 8": null,
                          "Aggregration Level 16": null
                        }
                      },
                      "Format_21": {
                        "Temp": null
                      },
                      "Format_22": {
                        "Temp": null
                      },
                      "Format_23": {
                        "Mon Period": null,
                        "Num Pddch Cand": null
                      }
                    },
                    "[]": {},
                    "UE spec sspace": {
                      "Format": null
                    }
                  },
                  "sspace_info ->": {}
                }
              }
            },
            "DL BWP Params": {
              "[]": {
                "BWP Generic Params": {
                  "BWP Id": null,
                  "Loc And BW": null,
                  "Sub Carrier Spacing": null,
                  "Cyclic Prefix": null
                },
                "CFG mask": null,
                "DL BWP Common": {
                  "CFG Mask": null,
                  "Pdcch Common": {
                    "Enable": null,
                    "Coreset Zero Id": null,
                    "Search Space Zero Id": null,
                    "Coreset Active bmask": null,
                    "Coreset Release Bmask": null,
                    "Search Space Active Bmask": null,
                    "Search Space Rel Bmask": null,
                    "Search Space Id RMSI": null,
                    "Search Space ID OSI": null,
                    "Search Space ID Paging": null,
                    "Search Space ID RA": null
                  },
                  "Pdsch Common": {
                    "Enable": null,
                    "Num Pdsch Alloc List": null,
                    "Pdsch Time Dom Alloc List": {
                      "[]": {
                        "K Present": null,
                        "Mapping type": null,
                        "K": null,
                        "Start Sum and length": null
                      }
                    }
                  }
                },
                "DL BWP Dedicated": {
                  "CFG Mask": null,
                  "Pdcch CFG DED": {
                    "Enable": null,
                    "CFG Mask": null,
                    "Coreset Rel Bmask": null,
                    "Coreset Add Mod Bmask": null,
                    "search_space_rel_bmask": null,
                    "search_space_add_mod_bmask": null,
                    "Dl Preemption": {
                      "Enable": null,
                      "Time Freq Set": null,
                      "Int Rnti": null,
                      "Mon Slot Period Offset": null,
                      "Num int cfg per cell": null,
                      "Dci pyload size": null,
                      "INT CFG Per cell": {
                        "[]": {
                          "ServCell Idx": null,
                          "Pos In DCI": null
                        }
                      }
                    }
                  },
                  "Pdsch CFG DED": {
                    "Enable": null,
                    "Mcs Table": null,
                    "Rbg Size": null,
                    "CFG Mask": null,
                    "Pdsch Rsc Alloc": null,
                    "Max Code words Scheduled by DCI": null,
                    "Vrb to Prb InterLeaver": null,
                    "Data Scr Id": null,
                    "Num Pdsch Alloc List": null,
                    "Num Prb Bundling": {
                      "Prb Bundling Type": null,
                      "Static Bundle Size": null,
                      "Dyncamic Bundle Size Set1": null,
                      "Dyncamic Bundle Size Set2": null
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "0xB952 NR5G ML1 DL Handover": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G ML1 DL Handover": {
      "Version": null,
      "Current SFN time": {
        "Slot": null,
        "Sub FN": null,
        "Sys FN": null,
        "SCS": null
      },
      "OTA Cfg Param": {
        "Logging time Sub FN": null,
        "Logging time Sys FN": null,
        "Num cg add mod": null,
        "CG Add Mod": {
          "Log mask": null,
          "Common Cg Config": {
            "Cell group Id": null,
            "Crnti CFG": null,
            "Target Dl Cell Frequency": null,
            "Target Phy Cell Id": null,
            "CFG Mask": null,
            "CC Id Del Bmask": null,
            "CC Id addmod bmask": null,
            "RLM in sync out of sync threshold": null,
            "Mac main CFG": {
              "Is Cdrx Config Present": null,
              "Cdrx Config": {
                "Enable": null,
                "Harq Rtt Timer DL": null,
                "Harq Rtt Timer UL": null,
                "DRX Slot Offset": null,
                "Short Cycle Enable": null,
                "retransmission Timer DL": null,
                "retransmission Timer UL": null,
                "On Duration Timer": {
                  "Type": null,
                  "MS": null
                },
                "Inactivity Timer ms": null,
                "Long Cycle Param": {
                  "Long Cycle Duration ms": null,
                  "Offset": null
                },
                "Short Cycle Param": {
                  "Short Cycle Duration ms": null,
                  "Short Cycle Timer": null
                }
              }
            }
          },
          "Per CC Config": {
            "Cell Info": {
              "Band": null,
              "Phy Cell Id": null,
              "SSB Sub Carrier Spacing": null,
              "DL Cell frequency": null
            },
            "Duplex Mode": null,
            "SCC Id": null,
            "serv_cell_idx": null,
            "num_coreset_add_mod": null,
            "num_search_space_add_mod": null,
            "num_dl_bwp_id_addmod": null,
            "num_ul_bwp_id_addmod": null,
            "dl_bwp_id_rel_bmask": null,
            "dl_bwp_id_addmod_bmask": null,
            "ul_bwp_id_rel_bmask": null,
            "ul_bwp_id_addmod_bmask": null,
            "cfg_mask": null,
            "CC Common CFG": {
              "dmrs_type_a_pos": null,
              "SS PBCH BLK PWR": null,
              "SSB Period": null,
              "Rate Match Pattern Id Rel Bmask": null,
              "Rate Match Pattern Add Mod Mask": null,
              "CFG Mask": null,
              "Sub Carr Spacing": null,
              "SSB POS In Burst Bmask": null,
              "Lte Crs To Match Around": {
                "Enable": null,
                "DL Freq": null,
                "DL Bandwidth": null,
                "Num Crs Ports": null,
                "V Shift": null,
                "CFG Mask": null,
                "Num Mbsfn Subframe Config": null
              },
              "TDD UL DL CFG": {
                "Enable": null,
                "Ref Scs": null,
                "Pattern2 Enable": null,
                "Pattern 1": {
                  "DL Ul trans Period": null,
                  "Num DL Sym": null,
                  "Num Ul Sym": null,
                  "Num DL Slots": null,
                  "Num Ul Slots": null
                },
                "Pattern 2": {
                  "DL Ul trans Period": null,
                  "Num DL Sym": null,
                  "Num Ul Sym": null,
                  "Num DL Slots": null,
                  "Num Ul Slots": null
                }
              }
            },
            "CC Dedicated CFG": {
              "Tag Id": null,
              "BWP Inact Timer": null,
              "First Active DL bwp Id": null,
              "Default Dl Bwp Id": null,
              "First Active Ul Bwp": null,
              "UE Beam lock Fn": null,
              "Serving Cell mo id": null,
              "CFG Mask": null,
              "Scell Deact Timer": null,
              "Path loss Reference linking": null,
              "Antenna Info DL": {
                "Max Mimo Lyr Cfged": null,
                "Max Num Mimo Lyr": null,
                "Max Num rx": null
              },
              "Pdsch Serv Cell Cfg": {
                "Enable": null,
                "XoverHead": null,
                "Num Harq Processes": null,
                "Cfg Mask": null,
                "Pucch Cell": null,
                "cbg_cfg": {
                  "Enable": null,
                  "Max Cbg Per Tb": null,
                  "Cbg Flush Ind": null
                }
              },
              "Cross Car Scheduling Cfg": {
                "Scheduling Cell Info": {
                  "Cross Carrier Scheduling Type": null,
                  "cross_carr_scheduling_params": {
                    "Own": {
                      "CIF Presence": null
                    }
                  }
                }
              },
              "Lte Crs to Match Around": {
                "Enable": null,
                "DL Freq": null,
                "DL Bandwidth": null,
                "Num Crs Ports": null,
                "V Shift": null,
                "CFG Mask": null,
                "Num Mbsfn Subframe Config": null
              }
            },
            "DL Frequency Info": {
              "Abs Freq SSB": null,
              "Abs Freq Point A": null,
              "Num Scs Carriers": null,
              "Multi frequency Band List": {
                "Num Bands": null,
                "Frequency Band Indicator": {
                  "[]": null
                }
              },
              "Scs Spec Carrier List": {
                "[]": {
                  "Offset To Carrier": null,
                  "Carrier BW Prb": null,
                  "SCS": null,
                  "Carrier BW": null
                }
              }
            },
            "UL Frequency Info": {
              "Abs Freq Point A": null,
              "P Max": null,
              "Add Spectrum emission Present": null,
              "Add Spectrum Emission": null,
              "Freq Shift 7p5_khz": null,
              "Num SCS Carriers": null,
              "Multi Frequency band List": {
                "Num Bands": null,
                "Frequency Band Indicator": {
                  "[]": null
                }
              },
              "Scs Spec Carrier List": {
                "[]": {
                  "Offset To Carrier": null,
                  "Carrier BW Prb": null,
                  "SCS": null,
                  "Carrier BW": null
                }
              }
            },
            "DL BWP Params": {
              "[]": {
                "BWP Generic Params": {
                  "BWP Id": null,
                  "Loc And BW": null,
                  "Sub Carrier Spacing": null,
                  "Cyclic Prefix": null
                },
                "CFG mask": null,
                "DL BWP Common": {
                  "CFG Mask": null,
                  "Pdcch Common": {
                    "Enable": null,
                    "Coreset Zero Id": null,
                    "Search Space Zero Id": null,
                    "Coreset Active bmask": null,
                    "Coreset Release Bmask": null,
                    "Search Space Active Bmask": null,
                    "Search Space Rel Bmask": null,
                    "Search Space Id RMSI": null,
                    "Search Space ID OSI": null,
                    "Search Space ID Paging": null,
                    "Search Space ID RA": null
                  },
                  "Pdsch Common": {
                    "Enable": null,
                    "Num Pdsch Alloc List": null,
                    "Pdsch Time Dom Alloc List": {
                      "[]": {
                        "K Present": null,
                        "Mapping type": null,
                        "K": null,
                        "Start Sum and length": null
                      }
                    }
                  }
                },
                "DL BWP Dedicated": {
                  "CFG Mask": null,
                  "Pdcch CFG DED": {
                    "Enable": null,
                    "CFG Mask": null,
                    "Coreset Rel Bmask": null,
                    "Coreset Add Mod Bmask": null,
                    "search_space_rel_bmask": null,
                    "search_space_add_mod_bmask": null,
                    "Dl Preemption": {
                      "Enable": null,
                      "Time Freq Set": null,
                      "Int Rnti": null,
                      "Mon Slot Period Offset": null,
                      "Num int cfg per cell": null,
                      "Dci pyload size": null,
                      "INT CFG Per cell": {
                        "[]": {
                          "ServCell Idx": null,
                          "Pos In DCI": null
                        }
                      }
                    }
                  },
                  "Pdsch CFG DED": {
                    "Enable": null,
                    "Mcs Table": null,
                    "Rbg Size": null,
                    "CFG Mask": null,
                    "Pdsch Rsc Alloc": null,
                    "Max Code words Scheduled by DCI": null,
                    "Vrb to Prb InterLeaver": null,
                    "Data Scr Id": null,
                    "Num Pdsch Alloc List": null,
                    "Num Prb Bundling": {
                      "Prb Bundling Type": null,
                      "Static Bundle Size": null,
                      "Dyncamic Bundle Size Set1": null,
                      "Dyncamic Bundle Size Set2": null
                    },
                    "Pdsch Time Dom alloc list": {
                      "[]": {
                        "K Present": null,
                        "Mapping type": null,
                        "K": null,
                        "Start Sum and length": null
                      }
                    }
                  }
                }
              }
            },
            "UL BWP Addmod": {
              "[]": {
                "BWP Id": null,
                "Loc And BW": null,
                "Sub Carrier Spacing": null,
                "Cyclic Prefix": null
              }
            },
            "Coreset Add Mod": {
              "[]": {
                "Control Resource Set ID": null,
                "Duration": null,
                "Freq_Dom_Rsc": null,
                "TCI_States_Pdcch_To_Add_Bmask": null,
                "TCI_States_Pdcch_To_Rel_Bmask": null,
                "TCI_Present_in_DCI": null,
                "Pdcch Dmrs Scr ID": null,
                "Precoder Gran": null,
                "CCE Req Mapping": {
                  "CCE_Reg_Mapping_type": null,
                  "Interleaved_CCE_Req_Mapping": {
                    "Req Bundle Size": null,
                    "Precoder_Gran": null,
                    "InterLeaver Rows": null,
                    "Shift Index": null
                  }
                }
              }
            },
            "Search Space Add Mod": {
              "[]": {
                "Search Space Id": null,
                "num_candidates_aggregation_level": {
                  "Aggregration Level 1": null,
                  "Aggregration Level 2": null,
                  "Aggregration Level 4": null,
                  "Aggregration Level 8": null,
                  "Aggregration Level 16": null
                },
                "CFG Mask": null,
                "Mon Slot Period": null,
                "Control Resource Set Id": null,
                "Mon Slot offeset": null,
                "Mon sym within slot bmask": null,
                "Search Space": {
                  "sspace type": null,
                  "sspace_info": {
                    "common_sspace_0": {
                      "CFG Mask": null,
                      "Format_00_and Format_10": {
                        "Temp1": null
                      },
                      "Format_20": {
                        "Aggregation Level is Valid": null,
                        "Nr of Candidate SFI": {
                          "Aggregration Level 1": null,
                          "Aggregration Level 2": null,
                          "Aggregration Level 4": null,
                          "Aggregration Level 8": null,
                          "Aggregration Level 16": null
                        }
                      },
                      "Format_21": {
                        "Temp": null
                      },
                      "Format_22": {
                        "Temp": null
                      },
                      "Format_23": {
                        "Mon Period": null,
                        "Num Pddch Cand": null
                      }
                    },
                    "UE spec sspace": {
                      "Format": null
                    },
                    "[]": {}
                  },
                  "sspace_info ->": {}
                }
              }
            }
          }
        }
      }
    }
  },
  "0xB96A NR5G ML1 Searcher FW Cell Meas Confirm": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G ML1 Searcher FW Cell Meas Confirm": {
      "Version": null,
      "Header": {
        "sfn": null,
        "subfn": null,
        "slotNum": null,
        "seqId": null,
        "status": null,
        "confCause": null,
        "confTime": null
      },
      "Data Header": {
        "rasterPointsNum": null,
        "NBIdBitmask": null,
        "servingSSB": null,
        "servingRxBeamId": null
      },
      "Rasters": {
        "[]": {
          "Raster Header": {
            "rasterCenterFreq": null,
            "logicalToPhysicalRxMapping": null,
            "newGainState": null,
            "channelResponse1": null,
            "channelResponse2": null,
            "totalGain": null,
            "NBId": null,
            "SSBSCS": null,
            "measMode": null,
            "logicalRxAntennaBitmak": null,
            "sampleStatus": null,
            "measWindowNum": null
          },
          "Meas Window": {
            "[]": {
              "Window Header": {
                "nrarfcn": null,
                "carrierIndex": null,
                "ssborCellsNum": null
              },
              "SSBorCells": {
                "[]": {
                  "timingDelta": null,
                  "cellId": null,
                  "ssbIndex": null,
                  "lnaGain": null,
                  "rsrpRx0": null,
                  "rsrpRx1": null,
                  "sinrRx0": null,
                  "sinrRx1": null,
                  "rssiRx0": null,
                  "rssiRx1": null,
                  "rsrqRx0": null,
                  "rsrqRx1": null,
                  "rxBeamPair": null,
                  "measType": null,
                  "measResultStatus": null
                }
              }
            }
          }
        }
      },
      "un-decoded": null
    }
  },
  "0xB96D NR5G ML1 Searcher ACQ Config And Response": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G ML1 Searcher ACQ Config And Response": {
      "Version": null,
      "Trans Id": null,
      "Num Raster": null,
      "Raster List": {
        "[]": {
          "Band": null,
          "ARFCN": null,
          "SCS": null,
          "Status": null,
          "Num Cell Detect": null,
          "Cell Detect List": {
            "[]": {
              "Phy Cell Id": null,
              "MIB": {
                "SFN": null,
                "SSB Index": null,
                "Half Frame Number": null,
                "Intra Freq Reselection": null,
                "Cell Barred": null,
                "PDCCH Config Sib1": null,
                "DMRS TypeA Position": null,
                "SSB SubCarrier Offset": null,
                "Subcarrier Spacing Common": null
              },
              "RSRP Raw": null
            }
          }
        }
      }
    }
  },
  "0xB970 NR5G ML1 Searcher Idle S Criteria": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G ML1 Searcher Idle S Criteria": {
      "Version": null,
      "Versions": {
        "System Time": {
          "Slot Number": null,
          "SubFrame Number": null,
          "System Frame Number": null,
          "SCS": null
        }
      },
      "NR ARFCN": null,
      "Phy Cell ID": null,
      "Serving SSB Index": null,
      "q_rxlevmin": null,
      "q_rxlevmin_offset": null,
      "p_max": null,
      "max_ue_tx_pwr": null,
      "Qoffset Temp": null,
      "cell_quality_rsrp": null,
      "s_rxlev": null,
      "Q Qual Min Present": null,
      "q_qualmin": null,
      "Q Qualmin Offset": null,
      "s_qual": null,
      "cell_quality_rsrq": null,
      "Result": null
    }
  },
  "0xB9BE NR5G ML1 Search HO Acq Req": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G ML1 Search HO Acq Req": {
      "Version": null,
      "Slot Number": null,
      "SubFrame Number": null,
      "System Frame Number": null,
      "SCS": null,
      "Data": {
        "Target ARFCN": null,
        "Target PCI": null,
        "Band": null,
        "SSB Bitmask": null,
        "HO Type": null,
        "SCS": null,
        "Duplex Mode": null,
        "SSBs Period": null,
        "Max Num SSB": null,
        "CC Id": null
      }
    }
  },
  "0xB9BF NR5G ML1 Search HO Acq Confirm": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G ML1 Search HO Acq Confirm": {
      "Verison": null,
      "Slot Number": null,
      "SubFrame Number": null,
      "System Frame Number": null,
      "SCS": null,
      "Data": {
        "HO Acq Duration": null,
        "Result": null,
        "Num ACQ Attempts": null,
        "HO ACQ Pass Result": {
          "[]": {
            "ARFCN": null,
            "Cell Id": null,
            "Num SSB Detected": null,
            "Best TX Beam Id": null,
            "SSS RSRP": null,
            "SSS RSRQ": null,
            "SSS SINR": null,
            "RX Beam Pair": {
              "[]": null
            },
            "ARFCN Center Frequency": null,
            "Frequency Offset": null
          }
        }
      }
    }
  },
  "0x1FFB Encapsulated Event Report": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "Encapsulated Event Report": {
      "Length": null,
      "Event": {
        "ID": null,
        "Timestamp": null,
        "Payload Size": null,
        "EVENT_DIAG_QSHRINK_ID": {
          "Diag Id": null,
          "GUID": null
        },
        "EVENT_DIAG_PROCESS_NAME_ID": {
          "Diag Id": null,
          "GUID": null
        },
        "EVENT_QC_RESERVED": {},
        "EVENT_NAS_MM5G_TIMER_STOP": {
          "SM5G Timer Id": null
        },
        "EVENT_NR5G_RRC_UL_MSG_V2": {
          "LC Type": null,
          "Message Type": null
        },
        "EVENT_DS_3GPP_WM_MGR": {
          "Event ID": null,
          "Bearer ID": null,
          "WM Instance": null,
          "WM State": null,
          "UL Direction": null,
          "DL Direction": null,
          "UL Split Thresh": null,
          "Small Packet Threshold": null,
          "Trailer Bytes": null,
          "UL Pri Path": null,
          "UL Sdap": null,
          "DL Sdap": null
        },
        "EVENT_DATAMODEM_IPA_DROP_PKT_UL": {
          "pkt_len": null,
          "exception_type": null,
          "drop_resason": null
        },
        "EVENT_DS_DORMANCY_STATUS_RM_QUEUE_STATS": {
          "UM Physlink Pointer": null,
          "RM WM RX Current Count": null,
          "RM WM TX Current Count": null,
          "Dormancy Status": null
        },
        "EVENT_NR5G_RRC_UL_MSG_MEAS_REPORT_V4": {
          "meas_id": null,
          "meas_report_type": null
        },
        "EVENT_QC_GPS_EVENT": {},
        "EVENT_TCP_QC": {
          "sock_fd": null,
          "tcp_state": null
        },
        "EVENT_NAS_MM5G_TIMER_START": {
          "SM5G Timer Id": null
        },
        "EVENT_LTE_RRC_TIMER_STATUS": {
          "Timer Name": null,
          "Timer Value": null,
          "Timer State": null
        }
      }
    }
  },
  "0xB9A7 NR5G ML1 DLM2 CA Metrics Request": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G ML1 DLM2 CA Metrics Request": {
      "Version": null,
      "Versions": {
        "Current Systime": {
          "Slot": null,
          "Sub FN": null,
          "Sys FN": null,
          "SCS": null
        }
      },
      "Event": null,
      "Num Carriers": null,
      "Total Metrics": {
        "Elapsed Time(ms)": null
      },
      "CA Configured Metrics": {
        "Elapsed Time(ms)": null
      },
      "CA Activated Metrics": {
        "Elapsed Time(ms)": null
      },
      "Carrier Config": {
        "[]": {
          "CC ID": null,
          "SCC ID": null,
          "PCI": null,
          "DL State": null,
          "DL EARFCN": null,
          "Band": null,
          "DL Bandwidth": null,
          "UL State": null,
          "UL Bandwidth": null,
          "UL EARFCN": null
        }
      }
    }
  },
  "0xB825 NR5G RRC Configuration Info": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G RRC Configuration Info": {
      "Version": null,
      "State": null,
      "Config Status": null,
      "Connectivity Mode": null,
      "Num Active SRB": null,
      "Num Active DRB": null,
      "MN MCG DRB IDs": null,
      "SN MCG DRB IDs": null,
      "MN SCG DRB IDs": null,
      "SN SCG DRB IDs": null,
      "MN Split DRB IDs": null,
      "SN Split DRB IDs": null,
      "LTE Serving Cell Info": {
        "Num Bands": null
      },
      "Num Contiguous CC Groups": null,
      "Num Active CC": null,
      "Num Active RB": null,
      "Contiguous CC Info": {
        "[]": {
          "Band Number": null,
          "DL BW Class": null,
          "UL BW Class": null
        }
      },
      "NR5G Serving Cell Info": {
        "[]": {
          "Param List": {
            "CC Id": null,
            "Cell Id": null,
            "DL Arfcn": null,
            "UL Arfcn": null,
            "SSB Arfcn": null,
            "Band": null,
            "Band Type": null,
            "DL Carrier Bandwidth": null,
            "UL Carrier Bandwidth": null,
            "DL Max MIMO": null,
            "UL Max MIMO": null
          }
        }
      },
      "Radio Bearer Info": {
        "[]": {
          "RB ID": null,
          "Termination Point": null,
          "DL RB Type": null,
          "DL RB Path": null,
          "DL ROHC Enabled": null,
          "DL Cipher Algo": null,
          "DL Integrity Algo": null,
          "UL RB Type": null,
          "UL RB Path": null,
          "UL ROHC Enabled": null,
          "UL Cipher Algo": null,
          "UL Integrity Algo": null,
          "UL Primary Path": null,
          "UL PDCP Dup Activated": null,
          "UL Data Split Threshold": null
        }
      }
    }
  },
  "0xB96E NR5G ML1 Searcher Measurement Config": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G ML1 Searcher Measurement Config": {
      "Version": null,
      "Record": {
        "conn_srv_cell": {
          "earfcn": null,
          "subfn": null,
          "cell_id": null
        },
        "conn_meas_cfg_bitmasks": {
          "meas_obj_valid_bitmask": null,
          "meas_id_valid_bitmask": null,
          "report_cfg_valid_bitmask": null,
          "meas_obj_mod_bitmask": null,
          "meas_id_mod_bitmask": null,
          "report_cfg_mod_bitmask": null,
          "other_mod_bitmask": null
        },
        "conn_meas_id_cfg": {
          "num_meas_id": null,
          "meas_id_conf": {
            "[]": {
              "meas_id": null,
              "meas_obj_id": null,
              "rpt_cfg_id": null
            }
          }
        }
      }
    }
  },
  "0xB96F NR5G ML1 Searcher Conn Eval": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G ML1 Searcher Conn Eval": {
      "Version": null,
      "System Time": {
        "Slot Number": null,
        "SubFrame Number": null,
        "System Frame Number": null,
        "SCS": null
      },
      "Num Cells": null,
      "Cell Info": {
        "[]": {
          "RAT Type": null,
          "State": null,
          "Meas Id": null,
          "Num Reports Sent": null,
          "Cell Id": null,
          "TTT Remaining": null
        }
      }
    }
  },
  "0xB97F NR5G ML1 Searcher Measurement Database Update Ext": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G ML1 Searcher Measurement Database Update Ext": {
      "Version": null,
      "System Time": {
        "Slot Number": null,
        "SubFrame Number": null,
        "System Frame Number": null,
        "SCS": null
      },
      "Num Layers": null,
      "SSB Periodicity Serv Cell": null,
      "Frequency Offset Raw": null,
      "Timing Offset": null,
      "Component Carrier List": {
        "[]": {
          "Raster Freq": null,
          "Num Cells": null,
          "Serving Cell Index": null,
          "Serving Cell PCI": null,
          "Serving SSB": null,
          "Serving RX Beam": {
            "[]": null
          },
          "Serving RFIC ID": null,
          "ServingSubarrayId": {
            "[]": {
              "SubArray ID": null
            }
          },
          "Cells": {
            "[]": {
              "PCI": null,
              "PBCH SFN": null,
              "Num Beams": null,
              "CellQualityRsrp": {
                "Quality RSRP": null
              },
              "CellQualityRsrq": {
                "Quality RSRQ": null
              },
              "Detected Beams": {
                "[]": {
                  "SSB Index": null,
                  "RX Beam Info": {
                    "RxBeamId": {
                      "[]": {
                        "RX Beam Id": null
                      }
                    },
                    "SSB Ref Timing 1": null,
                    "SSB Ref Timing 2": null,
                    "Rsrps": {
                      "[]": {
                        "RSRP": null
                      }
                    }
                  },
                  "Filtered Tx Beam RSRP": null,
                  "Filtered Tx Beam RSRQ": null,
                  "L2NR Filtered Tx Beam RSRP L3": null,
                  "L2NR Filtered Tx Beam RSRQ L3": null
                }
              }
            }
          }
        }
      }
    }
  },
  "0xB881 NR5G MAC UL TB Stats": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G MAC UL TB Stats": {
      "Version": null,
      "Sub ID": null,
      "Num Records": null,
      "Records": {
        "TB New Tx Bytes": null,
        "TB ReTx Bytes": null,
        "Num MCS": null,
        "Num PRB": null,
        "PHR": null,
        "Max Power": null,
        "Num New TX TB": null,
        "Num ReTx TB": null,
        "RI": null,
        "CQI": null,
        "Num PHR": null,
        "TPC Accum": null,
        "Num ULSCH Sched": null,
        "Num No ULSCH Sched": null,
        "Pcmax": null,
        "Flush Gap Count": null
      }
    }
  },
  "0xB888 NR5G MAC PDSCH Stats": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G MAC PDSCH Stats": {
      "Version": null,
      "Num Records": null,
      "Flush Gap Count": null,
      "Num Total Slots Raw": null,
      "Num Total Slots": null,
      "Num CA": null,
      "Cumulative Bitmask": null,
      "Records": {
        "[]": {
          "Carrier ID": null,
          "Num Slots Elapsed": null,
          "Num PDSCH Decode": null,
          "Num CRC Pass TB": null,
          "Num CRC Fail TB": null,
          "Num ReTx": null,
          "ACK As NACK": null,
          "HARQ Failure": null,
          "CRC Pass TB Bytes": null,
          "CRC Fail TB Bytes": null,
          "TB Bytes": null,
          "Padding Bytes": null,
          "ReTx Bytes": null,
          "BLER": null,
          "Residual BLER": null
        }
      }
    }
  },
  "0xB823 NR5G RRC Serving Cell Info": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G RRC Serving Cell Info": {
      "Version": null,
      "Versions": {
        "Physical Cell ID": null
      },
      "DL Frequency": null,
      "UL Frequency": null,
      "DL Bandwidth": null,
      "UL Bandwidth": null,
      "Cell Id": null,
      "Selected PLMN MCC": null,
      "Num MNC Digits": null,
      "Selected PLMN MNC": null,
      "Allowed Access": null,
      "TAC": null,
      "Freq Band Indicator": null
    }
  },
  "0xB889 NR5G MAC RACH Trigger": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G MAC RACH Trigger": {
      "Version": null,
      "Sub ID": null,
      "Header": {
        "Num Records": null
      },
      "CRNTI": null,
      "Rach Reason": null,
      "Carrier Id": null,
      "First Active UL BWP": null,
      "RACH Contention": null,
      "RA Id": null,
      "MSG3 Size": null,
      "MSG3": null
    }
  },
  "0xB88A NR5G MAC RACH Attempt": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "NR5G MAC RACH Attempt": {
      "Version": null,
      "Header": {
        "Sub ID": null,
        "Num Records": null
      },
      "Num Attempts": null,
      "SSB ID": null,
      "CSI-RS ID": null,
      "Carrier ID": null,
      "RACH Result": null,
      "Contention Type": null,
      "RACH MSG Bitmask": null,
      "Msg1 SCS": null,
      "UL BWP SCS": null,
      "Power Limited": null,
      "RACH Msg1": {
        "System Time": {
          "Frame": null,
          "SubFrame": null,
          "Slot": null,
          "SCS": null
        },
        "Symbol Start": null,
        "Preamble Format": null,
        "PRACH Config": null,
        "Uroot": null,
        "RAID": null,
        "FDM": null,
        "Cyclic Shift V.": null,
        "RA_RNTI": null,
        "RAR Window Start": {
          "Frame": null,
          "SubFrame": null,
          "Slot": null,
          "SCS": null
        },
        "RAR Window End": {
          "Frame": null,
          "SubFrame": null,
          "Slot": null,
          "SCS": null
        },
        "Backoff Duration (usec)": null
      },
      "RACH Msg2": {
        "System Time": {
          "Frame": null,
          "SubFrame": null,
          "Slot": null,
          "SCS": null
        },
        "Max Backoff Duration": null,
        "T_RNTI": null,
        "TA Value": null,
        "Result": null,
        "SCS": null
      },
      "RACH Msg3": {
        "System Time": {
          "Frame": null,
          "SubFrame": null,
          "Slot": null,
          "SCS": null
        },
        "Msg3 Grant Raw": null,
        "Msg3 Grant Bytes": null,
        "HARQ ID": null,
        "SCS": null,
        "Mac PDU": null
      },
      "RACH Msg4": {
        "System Time": {
          "Frame": null,
          "SubFrame": null,
          "Slot": null,
          "SCS": null
        },
        "Contention Resolution Start": {
          "Frame": null,
          "SubFrame": null,
          "Slot": null,
          "SCS": null
        },
        "Contention Resolution End": {
          "Frame": null,
          "SubFrame": null,
          "Slot": null,
          "SCS": null
        },
        "C_RNTI": null
      }
    }
  },
  "0xB0C0 LTE RRC OTA Packet": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "LTE RRC OTA Packet": {
      "version": null,
      "LTE RRC Release": null,
      "NR RRC Release": null,
      "phyCellId": null,
      "freq": null,
      "sfn": null,
      "Channel": null,
      "bcch-dl-sch": {
        "message": {
          "c1": {
            "systemInformationBlockType1": {
              "cellAccessRelatedInfo": {
                "plmn-IdentityList": {
                  "[]": {
                    "plmn-Identity": {
                      "mcc": {
                        "[]": null
                      },
                      "mnc": {
                        "[]": null
                      }
                    },
                    "cellReservedForOperatorUse": null
                  }
                },
                "trackingAreaCode": null,
                "cellIdentity": null,
                "cellBarred": null,
                "intraFreqReselection": null,
                "csg-Indication": null
              },
              "cellSelectionInfo": {
                "q-RxLevMin": null,
                "q-RxLevMinOffset": null
              },
              "p-Max": null,
              "freqBandIndicator": null,
              "schedulingInfoList": {
                "[]": {
                  "si-Periodicity": null,
                  "sib-MappingInfo": {
                    "[]": null
                  }
                }
              },
              "si-WindowLength": null,
              "systemInfoValueTag": null,
              "nonCriticalExtension": {
                "lateNonCriticalExtension": {
                  "nonCriticalExtension": {
                    "nonCriticalExtension": {
                      "nonCriticalExtension": {
                        "nonCriticalExtension": {
                          "nonCriticalExtension": {
                            "schedulingInfoList-v12j0": {
                              "[]": {
                                "sib-MappingInfo-v12j0": {
                                  "[]": null
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "systemInformation": {
              "criticalExtensions": {
                "systemInformation-r8": {
                  "sib-TypeAndInfo": {
                    "[]": {
                      "sib2": {
                        "ac-BarringInfo": {
                          "ac-BarringForEmergency": null
                        },
                        "radioResourceConfigCommon": {
                          "rach-ConfigCommon": {
                            "preambleInfo": {
                              "numberOfRA-Preambles": null,
                              "preamblesGroupAConfig": {
                                "sizeOfRA-PreamblesGroupA": null,
                                "messageSizeGroupA": null,
                                "messagePowerOffsetGroupB": null
                              }
                            },
                            "powerRampingParameters": {
                              "powerRampingStep": null,
                              "preambleInitialReceivedTargetPower": null
                            },
                            "ra-SupervisionInfo": {
                              "preambleTransMax": null,
                              "ra-ResponseWindowSize": null,
                              "mac-ContentionResolutionTimer": null
                            },
                            "maxHARQ-Msg3Tx": null
                          },
                          "bcch-Config": {
                            "modificationPeriodCoeff": null
                          },
                          "pcch-Config": {
                            "defaultPagingCycle": null,
                            "nB": null
                          },
                          "prach-Config": {
                            "rootSequenceIndex": null,
                            "prach-ConfigInfo": {
                              "prach-ConfigIndex": null,
                              "highSpeedFlag": null,
                              "zeroCorrelationZoneConfig": null,
                              "prach-FreqOffset": null
                            }
                          },
                          "pdsch-ConfigCommon": {
                            "referenceSignalPower": null,
                            "p-b": null
                          },
                          "pusch-ConfigCommon": {
                            "pusch-ConfigBasic": {
                              "n-SB": null,
                              "hoppingMode": null,
                              "pusch-HoppingOffset": null,
                              "enable64QAM": null
                            },
                            "ul-ReferenceSignalsPUSCH": {
                              "groupHoppingEnabled": null,
                              "groupAssignmentPUSCH": null,
                              "sequenceHoppingEnabled": null,
                              "cyclicShift": null
                            }
                          },
                          "pucch-ConfigCommon": {
                            "deltaPUCCH-Shift": null,
                            "nRB-CQI": null,
                            "nCS-AN": null,
                            "n1PUCCH-AN": null
                          },
                          "soundingRS-UL-ConfigCommon": {
                            "release": null
                          },
                          "uplinkPowerControlCommon": {
                            "p0-NominalPUSCH": null,
                            "alpha": null,
                            "p0-NominalPUCCH": null,
                            "deltaFList-PUCCH": {
                              "deltaF-PUCCH-Format1": null,
                              "deltaF-PUCCH-Format1b": null,
                              "deltaF-PUCCH-Format2": null,
                              "deltaF-PUCCH-Format2a": null,
                              "deltaF-PUCCH-Format2b": null
                            },
                            "deltaPreambleMsg3": null
                          },
                          "ul-CyclicPrefixLength": null,
                          "uplinkPowerControlCommon-v1020": {
                            "deltaF-PUCCH-Format3-r10": null,
                            "deltaF-PUCCH-Format1bCS-r10": null
                          }
                        },
                        "ue-TimersAndConstants": {
                          "t300": null,
                          "t301": null,
                          "t310": null,
                          "n310": null,
                          "t311": null,
                          "n311": null
                        },
                        "freqInfo": {
                          "ul-CarrierFreq": null,
                          "ul-Bandwidth": null,
                          "additionalSpectrumEmission": null
                        },
                        "timeAlignmentTimerCommon": null,
                        "voiceServiceCauseIndication-r12": null
                      },
                      "sib3": {
                        "cellReselectionInfoCommon": {
                          "q-Hyst": null
                        },
                        "cellReselectionServingFreqInfo": {
                          "s-NonIntraSearch": null,
                          "threshServingLow": null,
                          "cellReselectionPriority": null
                        },
                        "intraFreqCellReselectionInfo": {
                          "q-RxLevMin": null,
                          "p-Max": null,
                          "s-IntraSearch": null,
                          "presenceAntennaPort1": null,
                          "neighCellConfig": {
                            "neighCellConfig": null
                          },
                          "t-ReselectionEUTRA": null
                        },
                        "s-IntraSearch-v920": {
                          "s-IntraSearchP-r9": null,
                          "s-IntraSearchQ-r9": null
                        },
                        "s-NonIntraSearch-v920": {
                          "s-NonIntraSearchP-r9": null,
                          "s-NonIntraSearchQ-r9": null
                        },
                        "q-QualMin-r9": null
                      },
                      "sib5": {
                        "interFreqCarrierFreqList": {
                          "[]": {
                            "dl-CarrierFreq": null,
                            "q-RxLevMin": null,
                            "p-Max": null,
                            "t-ReselectionEUTRA": null,
                            "threshX-High": null,
                            "threshX-Low": null,
                            "allowedMeasBandwidth": null,
                            "presenceAntennaPort1": null,
                            "cellReselectionPriority": null,
                            "neighCellConfig": {
                              "neighCellConfig": null
                            }
                          }
                        },
                        "interFreqCarrierFreqList-v1310": {
                          "[]": {}
                        }
                      },
                      "sib6": {
                        "t-ReselectionUTRA": null
                      },
                      "sib7": {
                        "t-ReselectionGERAN": null
                      },
                      "sib8": {
                        "searchWindowSize": null,
                        "parametersHRPD": {
                          "preRegistrationInfoHRPD": {
                            "preRegistrationAllowed": null
                          }
                        },
                        "csfb-SupportForDualRxUEs-r9": null
                      },
                      "sib24-v1530": {
                        "carrierFreqListNR-r15": {
                          "[]": {
                            "carrierFreq-r15": null,
                            "measTimingConfig-r15": {
                              "periodicityAndOffset-r15": {
                                "sf20-r15": null
                              },
                              "ssb-Duration-r15": null
                            },
                            "subcarrierSpacingSSB-r15": null,
                            "cellReselectionPriority-r15": null,
                            "cellReselectionSubPriority-r15": null,
                            "threshX-High-r15": null,
                            "threshX-Low-r15": null,
                            "q-RxLevMin-r15": null,
                            "p-MaxNR-r15": null,
                            "q-QualMin-r15": null,
                            "deriveSSB-IndexFromCell-r15": null,
                            "maxRS-IndexCellQual-r15": null,
                            "threshRS-Index-r15": {
                              "nr-RSRP-r15": null,
                              "nr-RSRQ-r15": null
                            },
                            "ssb-ToMeasure-r15": {
                              "mediumBitmap-r15": null,
                              "shortBitmap-r15": null
                            }
                          }
                        },
                        "t-ReselectionNR-r15": null,
                        "t-ReselectionNR-SF-r15": {
                          "sf-Medium": null,
                          "sf-High": null
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "ul-ccch": {
        "message": {
          "c1": {
            "rrcConnectionRequest": {
              "criticalExtensions": {
                "rrcConnectionRequest-r8": {
                  "ue-Identity": {
                    "s-TMSI": {
                      "mmec": null,
                      "m-TMSI": null
                    }
                  },
                  "establishmentCause": null,
                  "spare": null
                }
              }
            }
          }
        }
      },
      "dl-ccch": {
        "message": {
          "c1": {
            "rrcConnectionSetup": {
              "rrc-TransactionIdentifier": null,
              "criticalExtensions": {
                "c1": {
                  "rrcConnectionSetup-r8": {
                    "radioResourceConfigDedicated": {
                      "srb-ToAddModList": {
                        "[]": {
                          "srb-Identity": null,
                          "rlc-Config": {
                            "explicitValue": {
                              "am": {
                                "ul-AM-RLC": {
                                  "t-PollRetransmit": null,
                                  "pollPDU": null,
                                  "pollByte": null,
                                  "maxRetxThreshold": null
                                },
                                "dl-AM-RLC": {
                                  "t-Reordering": null,
                                  "t-StatusProhibit": null
                                }
                              }
                            }
                          },
                          "logicalChannelConfig": {
                            "explicitValue": {
                              "ul-SpecificParameters": {
                                "priority": null,
                                "prioritisedBitRate": null,
                                "bucketSizeDuration": null,
                                "logicalChannelGroup": null
                              }
                            }
                          }
                        }
                      },
                      "mac-MainConfig": {
                        "explicitValue": {
                          "ul-SCH-Config": {
                            "maxHARQ-Tx": null,
                            "periodicBSR-Timer": null,
                            "retxBSR-Timer": null,
                            "ttiBundling": null
                          },
                          "timeAlignmentTimerDedicated": null,
                          "phr-Config": {
                            "setup": {
                              "periodicPHR-Timer": null,
                              "prohibitPHR-Timer": null,
                              "dl-PathlossChange": null
                            }
                          }
                        }
                      },
                      "physicalConfigDedicated": {
                        "pdsch-ConfigDedicated": {
                          "p-a": null
                        },
                        "pusch-ConfigDedicated": {
                          "betaOffset-ACK-Index": null,
                          "betaOffset-RI-Index": null,
                          "betaOffset-CQI-Index": null
                        },
                        "uplinkPowerControlDedicated": {
                          "p0-UE-PUSCH": null,
                          "deltaMCS-Enabled": null,
                          "accumulationEnabled": null,
                          "p0-UE-PUCCH": null,
                          "pSRS-Offset": null,
                          "filterCoefficient": null
                        },
                        "cqi-ReportConfig": {
                          "cqi-ReportModeAperiodic": null,
                          "nomPDSCH-RS-EPRE-Offset": null
                        },
                        "antennaInfo": {
                          "explicitValue": {
                            "transmissionMode": null,
                            "ue-TransmitAntennaSelection": {
                              "release": null
                            }
                          }
                        },
                        "schedulingRequestConfig": {
                          "setup": {
                            "sr-PUCCH-ResourceIndex": null,
                            "sr-ConfigIndex": null,
                            "dsr-TransMax": null
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "ul-dcch": {
        "message": {
          "c1": {
            "rrcConnectionSetupComplete": {
              "rrc-TransactionIdentifier": null,
              "criticalExtensions": {
                "c1": {
                  "rrcConnectionSetupComplete-r8": {
                    "selectedPLMN-Identity": null,
                    "dedicatedInfoNAS": null,
                    "nonCriticalExtension": {
                      "nonCriticalExtension": {
                        "nonCriticalExtension": {
                          "nonCriticalExtension": {
                            "mobilityState-r12": null
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "ulInformationTransfer": {
              "criticalExtensions": {
                "c1": {
                  "ulInformationTransfer-r8": {
                    "dedicatedInfoType": {
                      "dedicatedInfoNAS": null
                    }
                  }
                }
              }
            }
          }
        }
      },
      "dedicatedInfoNAS": {
        "Direction": null,
        "Security header or skip ind": null,
        "Protocol Discriminator": null,
        "Msg auth. code": null,
        "Sequence Number": null,
        "2nd Sec. header": null,
        "2nd PD": null,
        "Message ID": null,
        "Tracking Area Update Request": {
          "neKSI": {
            "Type of security context flag (TSC)": null,
            "NAS KSI": null
          },
          "EPS update type": {
            "Active Flag": null,
            "EPS update type value": null
          },
          "Old GUTI": {
            "Length": null,
            "Type of identity": null,
            "Odd Even Ind": null,
            "GUTI": {
              "MCC": null,
              "MNC": null,
              "Operator": null,
              "MME Group ID": null,
              "MME Code": null,
              "M-TMSI": null
            }
          },
          "UE Network Capability": {
            "IEI": null,
            "Length": null,
            "EEA0": null,
            "128-EEA1": null,
            "128-EEA2": null,
            "128-EEA3": null,
            "EEA4": null,
            "EEA5": null,
            "EEA6": null,
            "EEA7": null,
            "EIA0": null,
            "128-EIA1": null,
            "128-EIA2": null,
            "128-EIA3": null,
            "EIA4": null,
            "EIA5": null,
            "EIA6": null,
            "EIA7": null,
            "UEA0": null,
            "UEA1": null,
            "UEA2": null,
            "UEA3": null,
            "UEA4": null,
            "UEA5": null,
            "UEA6": null,
            "UEA7": null,
            "UCS2 support (UCS2)": null,
            "UIA1": null,
            "UIA2": null,
            "UIA3": null,
            "UIA4": null,
            "UIA5": null,
            "UIA6": null,
            "UIA7": null,
            "ProSe direct discovery (ProSe-dd)": null,
            "the capability for ProSe": null,
            "H.245 After SRVCC Handover capability (H.245-ASH)": null,
            "Access class control for CSFB (ACC-CSFB) capability": null,
            "LTE Positioning Protocol (LPP) capability": null,
            "Location services (LCS) notification mechanisms capability": null,
            "1xSRVCC capability": null,
            "NF capability": null,
            "Extended protocol configuration options (ePCO)": null,
            "Header compression for control plane CIoT EPS optimization (HC-CP CIoT)": null,
            "EMM-REGISTERED without PDN connection (ERw/oPDN)": null,
            "S1-u data transfer (S1-U data)": null,
            "User plane CIoT EPS optimization (UP CIoT)": null,
            "Control plane CIoT EPS optimization (CP CIoT)": null,
            "ProSe UE-to-network-relay (ProSe-relay)": null,
            "ProSe direct communication (ProSe-dc)": null,
            "Signalling for a maximum number of 15 EPS bearer contexts (15 bearers)": null,
            "Service gap control (SGC)": null,
            "N1 mode supported (N1mode)": null,
            "Dual connectivity with NR (DCNR)": null,
            "Control plane data backoff support (CP backoff)": null,
            "Restriction on use of enhanced coverage support (RestrictEC)": null,
            "V2X communication over PC5 (V2X PC5)": null,
            "Multiple DRB support (multipleDRB)": null
          },
          "Last visited registered TAI": {
            "IEI": null,
            "MCC": null,
            "MNC": null,
            "Operator": null,
            "TAC": null
          },
          "EPS bearer context status": {
            "IEI": null,
            "Length": null,
            "EBI(7)": null,
            "EBI(6)": null,
            "EBI(5)": null,
            "EBI(4)": null,
            "EBI(3)": null,
            "EBI(2)": null,
            "EBI(1)": null,
            "EBI(15)": null,
            "EBI(14)": null,
            "EBI(13)": null,
            "EBI(12)": null,
            "EBI(11)": null,
            "EBI(10)": null,
            "EBI(9)": null,
            "EBI(8)": null
          },
          "Voice domain preference and UE's usage setting": {
            "IEI": null,
            "Length": null,
            "UE's usage setting": null,
            "Voice domain preference for E-UTRAN": null
          },
          "Old GUTI type": {
            "IEI": null,
            "GUTI Type": null
          },
          "MS Network Feature Support": {
            "IEI": null,
            "Extended periodic timers": null
          },
          "UE additional security capability": {
            "IEI": null,
            "Length": null,
            "5G-EA0": null,
            "128-5G-EA1": null,
            "128-5G-EA2": null,
            "128-5G-EA3": null,
            "5G-EA4": null,
            "5G-EA5": null,
            "5G-EA6": null,
            "5G-EA7": null,
            "5G-EA8": null,
            "5G-EA9": null,
            "5G-EA10": null,
            "5G-EA11": null,
            "5G-EA12": null,
            "5G-EA13": null,
            "5G-EA14": null,
            "5G-EA15": null,
            "5G-IA0": null,
            "128-5G-IA1": null,
            "128-5G-IA2": null,
            "128-5G-IA3": null,
            "5G-IA4": null,
            "5G-IA5": null,
            "5G-IA6": null,
            "5G-IA7": null,
            "5G-IA8": null,
            "5G-IA9": null,
            "5G-IA10": null,
            "5G-IA11": null,
            "5G-IA12": null,
            "5G-IA13": null,
            "5G-IA14": null,
            "5G-IA15": null
          },
          "UE status": {
            "IEI": null,
            "Length": null,
            "5GMM registration status (N1 mode reg)": null,
            "EMM registration status (S1 mode reg)": null
          }
        },
        "Tracking Area Update Accept": {
          "EPS update result": {
            "EPS update result value": null
          },
          "T3412 value": {
            "IEI": null,
            "Unit": null,
            "Timer value": null
          },
          "GUTI": {
            "IEI": null,
            "Length": null,
            "Type of identity": null,
            "Odd Even Ind": null,
            "GUTI": {
              "MCC": null,
              "MNC": null,
              "Operator": null,
              "MME Group ID": null,
              "MME Code": null,
              "M-TMSI": null
            }
          },
          "TAI list": {
            "IEI": null,
            "Length": null,
            "TAI": {
              "[]": {
                "Type of list": null,
                "Number of elements": null,
                "MCC": null,
                "MNC": null,
                "Operator": null,
                "TAC": {
                  "[]": null
                }
              }
            }
          },
          "EPS bearer context status": {
            "IEI": null,
            "Length": null,
            "EBI(7)": null,
            "EBI(6)": null,
            "EBI(5)": null,
            "EBI(4)": null,
            "EBI(3)": null,
            "EBI(2)": null,
            "EBI(1)": null,
            "EBI(15)": null,
            "EBI(14)": null,
            "EBI(13)": null,
            "EBI(12)": null,
            "EBI(11)": null,
            "EBI(10)": null,
            "EBI(9)": null,
            "EBI(8)": null
          },
          "T3402 value": {
            "IEI": null,
            "Unit": null,
            "Timer value": null
          },
          "T3423 value": {
            "IEI": null,
            "Unit": null,
            "Timer value": null
          },
          "Emergency number list": {
            "IEI": null,
            "Length": null,
            "Number": {
              "[]": {
                "Emergency Service Category": {
                  "Mountain Rescue": null,
                  "Marine Guard": null,
                  "Fire Brigade": null,
                  "Ambulance": null,
                  "Police": null
                },
                "Digits": null
              }
            }
          },
          "EPS network feature support": {
            "IEI": null,
            "Length": null,
            "Control plane CIoT EPS optimization (CP CIoT)": null,
            "EMM REGISTERED without PDN connectivity (ERw/oPDN)": null,
            "Support of EXTENDED SERVICE REQUEST for packet services (ESRPS)": null,
            "Location services indicator in CS (CS-LCS)": null,
            "Location services indicator in EPC (EPC-LCS)": null,
            "Emergency bearer services indicator (EMC BS)": null,
            "IMS voice over PS session indicator (IMS VoPS)": null,
            "Signalling for a maximum number of 15 EPS bearer contexts (15 bearers)": null,
            "Interworking without N26 interface indicator (IWK N26)": null,
            "Restriction on the use of dual connectivity with NR (RestrictDCNR)": null,
            "Restriction on enhanced coverage (RestrictEC)": null,
            "Extended protocol configuration options (ePCO)": null,
            "Header compression for control plane CIoT EPS optimization (HC-CP CIoT)": null,
            "S1-u data transfer (S1-U data)": null,
            "User plane CIoT EPS optimization (UP CIoT)": null
          }
        },
        "Tracking Area Update Complete": {}
      },
      "dl-dcch": {
        "message": {
          "c1": {
            "dlInformationTransfer": {
              "rrc-TransactionIdentifier": null,
              "criticalExtensions": {
                "c1": {
                  "dlInformationTransfer-r8": {
                    "dedicatedInfoType": {
                      "dedicatedInfoNAS": null
                    }
                  }
                }
              }
            },
            "rrcConnectionRelease": {
              "rrc-TransactionIdentifier": null,
              "criticalExtensions": {
                "c1": {
                  "rrcConnectionRelease-r8": {
                    "releaseCause": null
                  }
                }
              }
            }
          }
        }
      },
      "pcch": {
        "message": {
          "c1": {
            "paging": {
              "pagingRecordList": {
                "[]": {
                  "ue-Identity": {
                    "s-TMSI": {
                      "mmec": null,
                      "m-TMSI": null
                    }
                  },
                  "cn-Domain": null
                }
              }
            }
          }
        }
      }
    }
  },
  "0xB184 LTE ML1 CA Metrics Log Packet": {
    "Event": null,
    "Length": null,
    "Log Code": null,
    "Timestamp": null,
    "LTE ML1 CA Metrics Log Packet": {
      "Version": null,
      "Versions": {
        "Version": {
          "event": null,
          "num_scells": null,
          "subfn": null,
          "sfn": null,
          "ENDC Mode Enabled": null,
          "pcell": {
            "earfcn": null,
            "pci": null,
            "band": null,
            "dl_bw": null
          },
          "total_metrics": {
            "pcell_only": {
              "dl_num_sf_scheduled": null,
              "ul_num_sf_scheduled": null,
              "dl_tb_size": null,
              "ul_tb_size": null
            },
            "scell_any": {
              "dl_num_sf_scheduled": null,
              "ul_num_sf_scheduled": null,
              "dl_tb_size": null,
              "ul_tb_size": null
            },
            "pcell_and_scell_any": {
              "dl_num_sf_scheduled": null,
              "ul_num_sf_scheduled": null,
              "dl_tb_size": null,
              "ul_tb_size": null
            },
            "pcell": {
              "dl_num_sf_scheduled": null,
              "ul_num_sf_scheduled": null,
              "dl_tb_size": null,
              "ul_tb_size": null
            },
            "elapsed_time": null
          },
          "ca_configured_metrics": {
            "pcell_only": {
              "dl_num_sf_scheduled": null,
              "ul_num_sf_scheduled": null,
              "dl_tb_size": null,
              "ul_tb_size": null
            },
            "scell_any": {
              "dl_num_sf_scheduled": null,
              "ul_num_sf_scheduled": null,
              "dl_tb_size": null,
              "ul_tb_size": null
            },
            "pcell_and_scell_any": {
              "dl_num_sf_scheduled": null,
              "ul_num_sf_scheduled": null,
              "dl_tb_size": null,
              "ul_tb_size": null
            },
            "pcell": {
              "dl_num_sf_scheduled": null,
              "ul_num_sf_scheduled": null,
              "dl_tb_size": null,
              "ul_tb_size": null
            },
            "elapsed_time": null
          },
          "ca_activated_metrics": {
            "pcell_only": {
              "dl_num_sf_scheduled": null,
              "ul_num_sf_scheduled": null,
              "dl_tb_size": null,
              "ul_tb_size": null
            },
            "scell_any": {
              "dl_num_sf_scheduled": null,
              "ul_num_sf_scheduled": null,
              "dl_tb_size": null,
              "ul_tb_size": null
            },
            "pcell_and_scell_any": {
              "dl_num_sf_scheduled": null,
              "ul_num_sf_scheduled": null,
              "dl_tb_size": null,
              "ul_tb_size": null
            },
            "pcell": {
              "dl_num_sf_scheduled": null,
              "ul_num_sf_scheduled": null,
              "dl_tb_size": null,
              "ul_tb_size": null
            },
            "elapsed_time": null
          }
        }
      }
    }
  }
};
window.HANDOVER_MESSAGE_DATA = window.HANDOVER_LOGCODE_STRUCTURE;
