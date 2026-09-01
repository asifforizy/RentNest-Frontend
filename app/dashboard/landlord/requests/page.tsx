import { getLandlordRequestsAction } from "../../_actions/landlord";
import RentalRequestList from "../../_components/RentalRequests";

export default async function RequestsPage() {

  const requests =
    await getLandlordRequestsAction();

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Rental Requests
      </h1>

      <RentalRequestList
        requests={requests}
      />

    </div>

  );
}