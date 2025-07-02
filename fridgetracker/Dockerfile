# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy solution file
COPY fridgetracker.sln ./

# Create subfolder and copy only the .csproj first (for layer caching)
RUN mkdir -p fridgetracker
COPY fridgetracker/fridgetracker.csproj fridgetracker/

# Restore NuGet packages
RUN dotnet restore fridgetracker.sln

# Copy the rest of the source code
COPY . ./

# Publish the project to a folder
RUN dotnet publish fridgetracker/ -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

# Copy published output and database
COPY --from=build /app/out ./ 
COPY --from=build /app/fridgetracker.db ./fridgetracker.db

# Run the app
ENTRYPOINT ["dotnet", "fridgetracker.dll"]
