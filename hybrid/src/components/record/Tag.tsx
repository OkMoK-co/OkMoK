import styles from '@/styles/record/Record.module.scss';

interface TagProps {
  tagName: string;
  value: string | number | undefined;
  onDeleteFilter: (tag: string) => void;
}
export default function Tag({ tagName, value, onDeleteFilter }: TagProps) {
  return (
    <>
      {value !== undefined ? (
        <span className={styles.tag}>
          {tagName}: {value}
          <button
            onClick={() => {
              onDeleteFilter(tagName);
            }}
          >
            x
          </button>
        </span>
      ) : null}
    </>
  );
}
