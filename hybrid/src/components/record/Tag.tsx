interface TagProps {
  tagName: string;
  value: string | number | undefined;
  onDeleteFilter: (tag: string) => void;
}
export default function Tag({ tagName, value, onDeleteFilter }: TagProps) {
  return (
    <>
      {value !== undefined ? (
        <button
          onClick={() => {
            onDeleteFilter(tagName);
          }}
        >
          {tagName} : {value}
        </button>
      ) : null}
    </>
  );
}
