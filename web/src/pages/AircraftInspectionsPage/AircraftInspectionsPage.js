import { MetaTags } from '@redwoodjs/web'

import AircraftInspectionsCell from 'src/components/AircraftInspectionsCell'
import formatTailNumber from 'src/functions/formatTailNumber'

const AircraftInspectionsPage = (params) => {
  const tailNumber = formatTailNumber(params.id)

  const pageTitle = `Aircraft ${tailNumber}: Inspections`

  return (
    <>
      <MetaTags title={pageTitle} description="Aircraft inspection details" />

      <h1>{pageTitle}</h1>
      {/* TODO: remove and replace with header from AircraftDetailsPage using AircraftDetailsLayout*/}

      <AircraftInspectionsCell id={params.id} />
    </>
  )
}

export default AircraftInspectionsPage
