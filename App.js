import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

const NUM_ITEMS = 20;

const getColor = i => {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
};

const initialData = [...Array(NUM_ITEMS)].map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${index}`,
    label: String(index) + '',
    height: 100,
    width: 60 + Math.random() * 40,
    backgroundColor,
  };
});

const App = () => {
  const [data, setData] = useState(initialData);

  const renderItem = ({item, drag, isActive}) => {
    const isDraggable = item.key !== data[0].key;
    return (
      <ScaleDecorator>
        <TouchableOpacity
          disabled={true}
          style={[
            styles.rowItem,
            {backgroundColor: isActive ? 'red' : item.backgroundColor},
          ]}>
          <Text style={styles.text}>{item.label}</Text>
          {isDraggable ? (
            <Text onLongPress={drag} style={styles.text}>
              🍔
            </Text>
          ) : (
            <Text style={styles.text} />
          )}
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({data: newData}) => {
        if (data[0].key === newData[0].key) {
          setData(newData);
        }
      }}
      keyExtractor={item => item.key}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: '100%',
    alignItems: 'center',
    alignContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});

export default App;
