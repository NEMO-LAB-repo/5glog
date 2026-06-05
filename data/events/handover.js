window.EVENT_DATA = window.EVENT_DATA || {};

window.EVENT_DATA.handover = {
  id: "handover",
  title: "Generic 5G NR Handover Procedure",
  description: "Generic 5G NR handover flow with RRC, ML1, MAC, network decision, target access, and user-plane resume.",
  commonEvidence: {
    hoConfirmedBy: "0x1FFB Encapsulated Event Report: EVENT_NR5G_RRC_HO_STARTED_V2; EVENT_NR5G_RRC_HO_SUCCESS; EVENT_NR5G_RRC_NEW_CELL_IND_V2.",
    hoConfirmedByEvents: [
      "EVENT_NR5G_RRC_HO_STARTED_V2",
      "EVENT_NR5G_RRC_HO_SUCCESS",
      "EVENT_NR5G_RRC_NEW_CELL_IND_V2"
    ],
    sourceTargetIdentity: "0xB823 NR5G RRC Serving Cell Info: Physical Cell ID, DL Frequency, Cell Id, Selected PLMN MCC/MNC, TAC. 0xB821 SIB1: cellIdentity, Physical Cell Id, Frequency.",
    sourceTargetIdentityFields: [
      "Physical Cell ID",
      "Physical Cell Id",
      "DL Frequency",
      "Cell Id",
      "Selected PLMN MCC/MNC",
      "TAC",
      "cellIdentity",
      "Frequency"
    ]
  },
  steps: {
    1: {
      title: "1. Measurement Configuration",
      layer: "RRC",
      decide: "0xB821 DL-DCCH RRCReconfiguration contains measConfig. Use it to understand what the UE should measure and which event can trigger a later MeasurementReport.",
      logcode: "0xB821 NR5G RRC OTA Packet. Full field tree is in the Message page.",
      logcodes: ["0xB821"],
      fields: ["DL-DCCH-Message", "rrcReconfiguration", "measConfig", "reportConfigToAddModList", "measIdToAddModList", "MeasurementReport", "measId", "reportConfigId", "eventId", "eventA3"],
      evidence: [
        {
          title: "Config location",
          detail: "Open Message detail, then follow the RRC tree down to measConfig.",
          logcodes: ["0xB821"],
          fields: ["DL-DCCH-Message", "rrcReconfiguration", "measConfig"]
        },
        {
          title: "Event trigger lookup",
          detail: "Use the report ID to map the later MeasurementReport back to the configured trigger event.",
          fields: ["reportConfigToAddModList", "MeasurementReport", "measId", "reportConfigId", "eventId", "eventA3"]
        }
      ]
    },
    2: {
      title: "2. Search / Measure",
      layer: "ML1 / RRC measurement control",
      decide: "ML1 follows RRC measurement config, searches/acquires cells, measures quality, filters results, evaluates event and time-to-trigger, then RRC sends MeasurementReport.",
      logcode: "See the relationship diagram below. Click each logcode box to open its structure.",
      logcodes: ["0xB821", "0xB96E", "0xB96D", "0xB96A", "0xB97F", "0xB96F"],
      fields: ["measObjectId", "ssbFrequency", "smtc1", "ssb-ToMeasure", "reportConfigId", "eventId", "a3-Offset", "hysteresis", "timeToTrigger", "reportQuantityCell", "raster frequency", "PCI", "SSB", "detected beams", "RSRP", "RSRQ", "SINR", "SSB index", "filtered cell quality", "CellQualityRsrp", "CellQualityRsrq", "Meas Id", "Cell Id", "State", "Num Reports Sent", "TTT Remaining", "MeasurementReport", "measId", "serving PCI", "neighbor PCI"]
    },
    3: {
      title: "3. Measurement Report",
      layer: "RRC",
      decide: "UE reports neighbor quality to network.",
      logcode: "0xB821 NR5G RRC OTA Packet -> U [NR] Measurement Report. Fields: measResults, measId, measResultNeighCells, physCellId, rsrp, rsrq, sinr.",
      logcodes: ["0xB821"],
      fields: ["measResults", "measId", "measResultNeighCells", "physCellId", "rsrp", "rsrq", "sinr"]
    },
    4: {
      title: "4. Network HO Decision / Target Preparation",
      layer: "Network",
      decide: "The source side selects the target cell and prepares the target side before sending the handover command to UE."
    },
    5: {
      title: "5. RRCReconfiguration w/ Sync",
      layer: "RRC",
      decide: "Real handover command/config sent to UE.",
      logcode: "0xB821 NR5G RRC OTA Packet -> D [NR] RRC Reconfiguration. Fields: reconfigurationWithSync, spCellConfigCommon, physCellId, absoluteFrequencySSB, newUE-Identity, rach-ConfigDedicated, masterKeyUpdate, keySetChangeIndicator, nextHopChainingCount.",
      logcodes: ["0xB821"],
      fields: ["reconfigurationWithSync", "spCellConfigCommon", "physCellId", "absoluteFrequencySSB", "newUE-Identity", "rach-ConfigDedicated", "masterKeyUpdate", "keySetChangeIndicator", "nextHopChainingCount"],
      identityLogcodes: ["0xB823", "0xB821"],
      identityFields: ["Physical Cell ID", "Physical Cell Id", "DL Frequency", "Cell Id", "Selected PLMN MCC/MNC", "TAC", "cellIdentity", "Frequency"],
      identity: "0xB823 NR5G RRC Serving Cell Info: Physical Cell ID, DL Frequency, Cell Id, Selected PLMN MCC/MNC, TAC. 0xB821 SIB1: cellIdentity, Physical Cell Id, Frequency."
    },
    6: {
      title: "6. Apply Target Config",
      layer: "ML1",
      decide: "ML1 receives/applies target cell config.",
      logcode: "0xB952 NR5G ML1 DL Handover. Fields: Target Dl Cell Frequency, Target Phy Cell Id, Crnti CFG, CG Add Mod, Cell Info, DL Cell frequency.",
      logcodes: ["0xB952"],
      fields: ["Target Dl Cell Frequency", "Target Phy Cell Id", "Crnti CFG", "CG Add Mod", "Cell Info", "DL Cell frequency"],
      identityLogcodes: ["0xB823", "0xB821"],
      identityFields: ["Physical Cell ID", "Physical Cell Id", "DL Frequency", "Cell Id", "Selected PLMN MCC/MNC", "TAC", "cellIdentity", "Frequency"],
      identity: "0xB823 NR5G RRC Serving Cell Info: Physical Cell ID, DL Frequency, Cell Id, Selected PLMN MCC/MNC, TAC. 0xB821 SIB1: cellIdentity, Physical Cell Id, Frequency."
    },
    7: {
      title: "7. Handover Execution",
      layer: "ML1 / MAC",
      decide: "UE switches from source-cell context to target-cell context. This is the execution window between target config apply and target RACH.",
      logcode: "0xB9A7 marks execution timing when Event is HANDOVER_START or HANDOVER_END. 0xB952 provides target context. Key fields: Event, PCI, DL EARFCN, Band, Target Phy Cell Id, Target DL Cell Frequency, Crnti CFG.",
      logcodes: ["0xB9A7", "0xB952"],
      fields: ["Event", "HANDOVER_START", "HANDOVER_END", "PCI", "DL EARFCN", "Band", "Target Phy Cell Id", "Target DL Cell Frequency", "Crnti CFG"]
    },
    8: {
      title: "8. Random Access",
      layer: "MAC",
      decide: "UE starts random access on the target cell after target config is applied.",
      logcode: "0xB889 RACH Trigger shows why MAC starts RACH. 0xB88A RACH Attempt shows the actual random-access attempt. Key fields: Rach Reason = HANDOVER, RACH Contention, CRNTI, Carrier Id / RA Id, Msg1, Msg2, Msg3, Msg4, Contention Type, RACH Result.",
      logcodes: ["0xB889", "0xB88A"],
      fields: ["Rach Reason", "HANDOVER", "CRNTI", "RACH Contention", "Carrier Id", "RA Id", "Msg1", "Msg2", "Msg3", "Msg4", "Contention Type", "RACH Result"]
    },
    9: {
      title: "9. Random Access Success",
      layer: "MAC / ML1",
      decide: "UE finishes target-cell random access successfully and target acquisition is confirmed.",
      logcode: "0xB88A MAC RA Result is direct MAC evidence that RACH succeeded. 0xB9BF HO Acquisition Confirm is ML1 evidence that target-cell acquisition succeeded. Key fields: RACH Result = SUCCESS, Contention Type = CONT_FREE, Result, ARFCN, Cell Id.",
      logcodes: ["0xB88A", "0xB9BF"],
      fields: ["RACH Result", "SUCCESS", "Contention Type", "CONT_FREE", "Result", "ARFCN", "Cell Id"]
    },
    10: {
      title: "10. RRCReconfigurationComplete",
      layer: "RRC",
      decide: "UE confirms handover completion to target.",
      logcode: "0xB821 NR5G RRC OTA Packet -> U [NR] RRC Reconfiguration Complete. Fields: ul-dcch -> c1 -> rrcReconfigurationComplete, Physical Cell Id, Frequency, rrc-TransactionIdentifier.",
      logcodes: ["0xB821"],
      fields: ["ul-dcch", "c1", "rrcReconfigurationComplete", "Physical Cell Id", "Frequency", "rrc-TransactionIdentifier"],
      confirm: "0x1FFB Encapsulated Event Report: EVENT_NR5G_RRC_HO_STARTED_V2; EVENT_NR5G_RRC_HO_SUCCESS; EVENT_NR5G_RRC_NEW_CELL_IND_V2.",
      confirmLogcodes: ["0x1FFB"],
      confirmFields: ["EVENT_NR5G_RRC_HO_STARTED_V2", "EVENT_NR5G_RRC_HO_SUCCESS", "EVENT_NR5G_RRC_NEW_CELL_IND_V2"],
      identityLogcodes: ["0xB823", "0xB821"],
      identityFields: ["Physical Cell ID", "Physical Cell Id", "DL Frequency", "Cell Id", "Selected PLMN MCC/MNC", "TAC", "cellIdentity", "Frequency"],
      identity: "0xB823 NR5G RRC Serving Cell Info: Physical Cell ID, DL Frequency, Cell Id, Selected PLMN MCC/MNC, TAC. 0xB821 SIB1: cellIdentity, Physical Cell Id, Frequency."
    },
    11: {
      title: "11. Data Resumes",
      layer: "UP / Data",
      decide: "User-plane data resumes after handover.",
      logcode: "No single HO logcode. Infer from MAC/PDCP stats after HO: 0xB888 NR5G MAC PDSCH Stats fields Num PDSCH Decode, Num CRC Pass TB, TB Bytes; 0xB881 NR5G MAC UL TB Stats fields TB New Tx Bytes, Num ULSCH Sched.",
      logcodes: ["0xB888", "0xB881"],
      fields: ["Num PDSCH Decode", "Num CRC Pass TB", "TB Bytes", "TB New Tx Bytes", "Num ULSCH Sched"]
    }
  }
};
