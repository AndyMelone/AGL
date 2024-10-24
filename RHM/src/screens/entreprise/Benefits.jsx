import { Button } from "antd"

export const Benefits = () => {
  return (
    <div className="mx-5 py-3">
    <div className="flex mx-2 justify-between my-3">
      <div>
        <h1 className="text-xl font-bold">Liste des Avantages</h1>
        <p>Voici la liste des Avantages de notre entreprise.</p>
      </div>
      <div>
        <Button
          type="primary"
          size="large"
          // onClick={() => navigate("/home/employees/create")}
        >
          Nouveau
        </Button>
      </div>
    </div>
    <div className="ag-theme-quartz" style={{ height: 500 }}>
     
    </div>
  </div>
  )
}
