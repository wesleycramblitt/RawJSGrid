class GridModelFactory {
    static getGridModel(model) {
        switch(model) {
            case "exercises":
                var exerciseModel = new GridModel(model, "Exercises", "exerciseID");

                var id = new GridColumn("exerciseID", 0, "id", false, false);
                var name = new GridColumn("name", "", "Name", true, true);
                var type = new GridEnumColumn("exerciseType", 0, "Type", true, true, ["Bodyweight", "Bodyweight with equipment", "Barbell", "Dumbbell", "Kettlebell", "Cables", "Machine"]);
                var isCompound = new GridColumn("isCompound", true, "Is Compound", true, true);
                var exercisemuscles = new GridRelatedColumn("exerciseMuscles", [], "Exercise Muscles", true, false, GridModelFactory.getGridModel("exercisemuscles"));
                exerciseModel.columns.push(id);
                exerciseModel.columns.push(name);
                exerciseModel.columns.push(type);
                exerciseModel.columns.push(isCompound);  
                exerciseModel.columns.push(exercisemuscles);
                return exerciseModel;
            break;
            case "exercisemuscles":
                var exerciseMusclesModel = new GridModel(model, "Exercise Muscles", "exerciseMuscleID");
                var id = new GridColumn("exerciseMuscleID", 0, "id", false, false);
                var muscleId = new GridEnumColumn("muscleID", 0, "Muscle", true, true);
                
                var a = new api();
                a.get("muscles", function (response) {
                    var muscles = JSON.parse(response);
                    var names = [];
                    for(var i = 0; i < muscles.length; i++) {
                        names.push(muscles[i].name);
                    }
                   muscleId.selectList = names;
                });

                var exerciseID = new GridColumn("exerciseID", 0, "Exercise ID", false, false);
                var percent = new GridColumn("percentInvolvement", 0, "Percent Involvement", true, true);

                exerciseMusclesModel.columns.push(id);
                exerciseMusclesModel.columns.push(muscleId);
                exerciseMusclesModel.columns.push(exerciseID);
                exerciseMusclesModel.columns.push(percent);

                return exerciseMusclesModel
            case "muscles":
                var muscleModel = new GridModel(model, "Muscles", "id");

                var id = new GridColumn("id", 0, "id", false, false);
                var name = new GridColumn("name", "", "Name", true, true);
                var isLarge = new GridColumn("isLarge", true, "Is Large", true, true);
            
                muscleModel.columns.push(id);
                muscleModel.columns.push(name);
                muscleModel.columns.push(isLarge);  
                return muscleModel;
            case "splits":
                var splitModel = new GridModel(model, "Splits", "id");

                var id = new GridColumn("id", 0, "id", false, false);
                var name = new GridColumn("name", "", "Name", true, true);
                var freq = new GridColumn("frequency", 1, "Frequency", true, true);
                var intensity = new GridColumn("intensity", 1, "Intensity", true, true);
                var description = new GridColumn("description", "", "Description", true, true);
            
                var splitDays = new GridRelatedColumn("splitDays", [], "Split Days",
                 true, false, GridModelFactory.getGridModel("splitdays"));
            
                splitModel.columns.push(id);
                splitModel.columns.push(name);
                splitModel.columns.push(description);
                splitModel.columns.push(freq);
                splitModel.columns.push(intensity);
                splitModel.columns.push(splitDays);
  
                return splitModel;
            case "splitdays":
                var splitDays = new GridModel(model, "Split Days", "id");

                var id = new GridColumn("id", 0, "id", false, false);
                var name = new GridColumn("name", "", "Name", true, true);
                var isRest = new GridColumn("isrest", false, "Is Rest", true, true);
                var splitDayMuscles = new GridRelatedColumn("splitDayMuscles", [], "Muscles", true, false,
                GridModelFactory.getGridModel("splitdaymuscles"));

                splitDays.columns.push(id);
                splitDays.columns.push(name);
                splitDays.columns.push(isRest);
                splitDays.columns.push(splitDayMuscles);

                return splitDays;
            case "splitdaymuscles":
                var splitDayMuscles = new GridModel(model, "Muscles", "id");

                var id = new GridColumn("id", 0, "id", false, false);
                var muscleId = new GridEnumColumn("muscleID", 0, "Muscle", true, true);
                
                var a = new api();
                a.get("muscles", function (response) {
                    var muscles = JSON.parse(response);
                    var names = [];
                    for(var i = 0; i < muscles.length; i++) {
                        names.push(muscles[i].name);
                    }
                   muscleId.selectList = names;
                });

                splitDayMuscles.columns.push(id);
                splitDayMuscles.columns.push(muscleId);

                return splitDayMuscles;
            case "repscheme":
                return;
            case "repschemeset":
                return;
        }
    }
}