import { useParams } from 'react-router-dom';

export default function ViewInformationEmploye() {
  const { id } = useParams();

  return (
    <div>
      <h1>Information sur employé</h1>
      <p>ID employé : {id}</p>
    </div>
  );
}
