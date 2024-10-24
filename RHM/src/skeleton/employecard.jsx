import { Skeleton } from 'antd'; // Assurez-vous d'avoir installé antd pour utiliser ce composant

export default function EmployeSkeletonCard() {
  return (
    <div className="w-80 border rounded-xl mx-auto">
      <div className="mx-auto text-center my-4">
        <Skeleton.Image className="w-28 h-28 my-2 border mx-auto rounded-3xl" />
      </div>
      <div className="my-2">
        <Skeleton.Input className="w-3/4 mx-auto" />
      </div>
      <div className="my-2">
        <Skeleton.Input className="w-1/2 mx-auto" />
      </div>
      <div className="flex justify-center items-center space-x-4 my-4">
        <div className="rounded-xl p-2 bg-slate-300 cursor-pointer">
          <Skeleton.Avatar size={24} />
        </div>
        <div className="rounded-xl p-2 bg-slate-300 cursor-pointer">
          <Skeleton.Avatar size={24} />
        </div>
      </div>
      <div>
        <div className="w-full border-t-2 flex justify-center px-1 mt-10 rounded-b-xl py-6">
          <div className="bg-gray-200 p-2 flex justify-center items-center space-x-2 rounded-2xl">
            <Skeleton.Avatar size={8} />
            <Skeleton.Input className="w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
