import React, { useState } from 'react';
import { downloadData } from '../../../utils/dataDump';

interface Props {
  t: string | null
}

const ExportWorkouts: React.FC<Props> = ({ t }) => {

  const [dataDump, setDataDump] = useState<string>("")

  return (
    <div className="settings-section-alt">
    Export your workout data as a CSV file. Click below to start your
    download.
    <div
      onClick={() => downloadData(setDataDump, t, "workouts")}
      className="export-data"
    >
      Export Data
    </div>
    <p>{dataDump && dataDump}</p>
  </div>
  )
}

export default ExportWorkouts