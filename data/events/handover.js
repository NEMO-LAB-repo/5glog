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
      decide: "Network configures what UE should measure.",
      logcode: "0xB821 NR5G RRC OTA Packet -> D [NR] RRC Reconfiguration. Fields: measConfig, measObjectToAddModList, reportConfigToAddModList, measIdToAddModList.",
      logcodes: ["0xB821"],
      fields: ["measConfig", "measObjectToAddModList", "reportConfigToAddModList", "measIdToAddModList"]
    },
    2: {
      title: "2. Search / Measure",
      layer: "ML1 / RRC measurement control",
      decide: "ML1 follows RRC measurement config, searches/acquires cells, measures quality, filters results, evaluates event/TTT, then RRC sends MeasurementReport.",
      logcode: "See the relationship diagram below. Click each logcode box to open its structure.",
      logcodes: ["0xB821", "0xB96E", "0xB96D", "0xB96A", "0xB97F", "0xB96F"],
      fields: ["measObjectId", "ssbFrequency", "smtc1", "ssb-ToMeasure", "reportConfigId", "eventId", "a3-Offset", "hysteresis", "timeToTrigger", "reportQuantityCell", "raster frequency", "PCI", "SSB", "detected beams", "RSRP", "RSRQ", "SINR", "SSB index", "filtered cell quality", "CellQualityRsrp", "CellQualityRsrq", "Meas Id", "Cell Id", "State", "Num Reports Sent", "TTT Remaining", "MeasurementReport", "measId", "serving PCI", "neighbor PCI"],
      note: "0xB970 is idle-mode S-criteria evidence. Do not use it as the connected-mode handover main chain.",
      noteLogcodes: ["0xB970"]
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
      title: "4. Network HO Decision / Preparation",
      layer: "Network",
      decide: "UE log cannot directly see the network decision; infer it from the later handover command.",
      logcode: "No direct UE logcode. Inferred when Step 5 appears: RRCReconfiguration contains reconfigurationWithSync.",
      fields: ["RRCReconfiguration", "reconfigurationWithSync"]
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
      layer: "MAC",
      decide: "UE starts switching from source to target.",
      logcode: "0xB952 plus 0xB9A7 NR5G ML1 DLM2 CA Metrics Request. Fields: Event: HANDOVER_START, Event: HANDOVER_END, PCI, DL EARFCN, Band.",
      logcodes: ["0xB952", "0xB9A7"],
      fields: ["Event", "HANDOVER_START", "HANDOVER_END", "PCI", "DL EARFCN", "Band"]
    },
    8: {
      title: "8. Random Access",
      layer: "MAC",
      decide: "UE starts random access on target cell.",
      logcode: "0xB889 NR5G MAC RACH Trigger. Fields: Rach Reason: HANDOVER, CRNTI, RACH Contention, Carrier Id, RA Id. Also 0xB88A NR5G MAC RACH Attempt.",
      logcodes: ["0xB889", "0xB88A"],
      fields: ["Rach Reason", "HANDOVER", "CRNTI", "RACH Contention", "Carrier Id", "RA Id"]
    },
    9: {
      title: "9. Random Access Success",
      layer: "MAC",
      decide: "RA/acquisition succeeded or handover proceeds past RA.",
      logcode: "Best evidence: 0xB9BF NR5G ML1 Search HO Acq Confirm. Fields: Result, ARFCN, Cell Id. If no explicit RA success field, infer from RRCReconfigurationComplete.",
      logcodes: ["0xB9BF"],
      fields: ["Result", "ARFCN", "Cell Id", "RRCReconfigurationComplete"],
      confirm: "If no explicit RA success field appears, use Step 10 and 0x1FFB events as confirmation: EVENT_NR5G_RRC_HO_SUCCESS; EVENT_NR5G_RRC_NEW_CELL_IND_V2.",
      confirmLogcodes: ["0x1FFB"],
      confirmFields: ["EVENT_NR5G_RRC_HO_SUCCESS", "EVENT_NR5G_RRC_NEW_CELL_IND_V2"]
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
