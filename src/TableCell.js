import { useEffect, useState } from "react";

const { fileApi } = window;

const renderFileName = fileName => fileName.split('.vpx')[0];
const getImageFile = (fileName) => fileApi.getTableArtwork(fileName);

function TableCell({ fileName, handleClick }) {
  const [artworkFile, setArtworkFile] = useState();

  useEffect(() => {
    setArtworkFile(getImageFile(fileName));
  }, [fileName]);

  return (
    <div
      className = "table-cell"
      onClick   = {() => handleClick(fileName)}
    >
      {artworkFile ?
        <img className="table-artwork" src={getImageFile(fileName)} alt={renderFileName(fileName)}/>
        :
        <span>{renderFileName(fileName)}</span>
      }
    </div>
  );
}

export default TableCell;
