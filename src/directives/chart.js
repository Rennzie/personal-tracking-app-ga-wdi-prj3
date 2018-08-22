function Chart(){
  return {
    restrict: 'A',
    linl($scope, $element){
      const domElement = $element[0];

      console.log('The dom elements is', domElement);
    }
  };
}

export default Chart;
