import Column from "../components/Column";
import Trash from "../components/Trash";

export const Kanban = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <div className="flex h-full w-full gap-3 overflow-scroll p-12">
        <Column title="TO DO" column="todo" />
        <Column title="IN PROGRESS" column="progress" />
        <Column title="IN REVIEW" column="review" />
        <Column title="DONE" column="done" />
        <Trash />
      </div>
    </div>
  );
};
